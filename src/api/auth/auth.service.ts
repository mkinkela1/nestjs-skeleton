import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { UsersRepository } from "src/api/auth/users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { DtoAuthCredentials } from "src/api/auth/dto/DtoAuthCredentials";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { DtoSignInResponse } from "src/api/auth/dto/response/DtoSignInResponse";
import { JwtPayload } from "src/jwt-payload.interface";
import {
  EmailAlreadyExistsException,
  UserNotFoundException,
  WrongEmailOrPasswordException,
} from "src/exceptions/AuthExceptions";
import { MailService } from "src/mail/mail.service";
import { DtoVerifyEmailRequest } from "src/api/auth/dto/request/DtoVerifyEmailRequest";
import { DtoRefreshTokenRequest } from "src/api/auth/dto/request/DtoRefreshTokenRequest";
import { DtoRefreshTokenResponse } from "src/api/auth/dto/response/DtoRefreshTokenResponse";
import { configService } from "src/config/config.service";
import jwtDecode from "jwt-decode";
import { InvalidEmailVerificationTokenException } from "src/exceptions/UserExceptions";
import { DtoResendVerificationEmailRequest } from "src/api/auth/dto/request/DtoResendVerificationEmailRequest";
import { User } from "src/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async signUp(dto: DtoAuthCredentials): Promise<void> {
    const { email, password } = dto;

    const salt = await bcrypt.genSalt();
    const emailConfirmationToken: string = this.getEmailConfirmationToken({
      email,
    });
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedEmailConfirmationToken: string = bcrypt.hash(
      emailConfirmationToken,
      salt,
    );

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      emailConfirmationToken: hashedEmailConfirmationToken,
    });

    try {
      await this.usersRepository.save(user);
      await this.mailService.sendConfirmationEmail(
        email,
        emailConfirmationToken,
      );
    } catch (e) {
      if (e.code === "23505") throw new EmailAlreadyExistsException();
      else throw new InternalServerErrorException();
    }
  }

  async signIn(dto: DtoAuthCredentials): Promise<DtoSignInResponse> {
    const { email, password } = dto;
    const user: User = await this.usersRepository.expectOne({ email });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw new WrongEmailOrPasswordException();

    const payload: JwtPayload = { email };
    const token: string = this.getAccessToken(payload);
    const refreshToken: string = this.getRefreshToken(payload);

    return new DtoSignInResponse(token, refreshToken);
  }

  async refreshToken(
    dto: DtoRefreshTokenRequest,
  ): Promise<DtoRefreshTokenResponse> {
    const { refreshToken } = dto;

    try {
      if (
        this.jwtService.verify(refreshToken, {
          secret: configService.getJwtRefreshTokenSecret(),
        })
      ) {
        const { email } = jwtDecode<JwtPayload>(refreshToken);
        if (!email) throw new UserNotFoundException();

        const payload = { email };
        const newToken = this.getAccessToken(payload);
        const newRefreshToken = this.getRefreshToken(payload);

        return new DtoRefreshTokenResponse(newToken, newRefreshToken);
      }
    } catch {
      throw new UserNotFoundException();
    }
  }

  async verifyEmail(dto: DtoVerifyEmailRequest): Promise<void> {
    const { emailConfirmationToken } = dto;

    if (
      !this.jwtService.verify(emailConfirmationToken, {
        secret: configService.getEmailConfirmationTokenSecret(),
      })
    )
      throw new InvalidEmailVerificationTokenException();

    const { email } = jwtDecode<JwtPayload>(emailConfirmationToken);
    if (!email) throw new UserNotFoundException();

    const user: User = await this.usersRepository.expectOne({ email });
    user.emailConfirmationToken = null;
    user.isActive = true;
    await this.usersRepository.save(user);
  }

  async resendVerificationEmail(
    dto: DtoResendVerificationEmailRequest,
  ): Promise<void> {
    const { email } = dto;

    const user: User = await this.usersRepository.expectOne({ email });
    const salt = await bcrypt.genSalt();
    const emailConfirmationToken: string = this.getEmailConfirmationToken({
      email,
    });
    const hashedEmailConfirmationToken: string = bcrypt.hash(
      emailConfirmationToken,
      salt,
    );

    await this.usersRepository.save({
      ...user,
      emailConfirmationToken: hashedEmailConfirmationToken,
    });
    await this.mailService.sendConfirmationEmail(email, emailConfirmationToken);
  }

  private getAccessToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: configService.getJwtTokenSecret(),
      expiresIn: configService.getJwtTokenDuration(),
    });
  }

  private getRefreshToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: configService.getJwtRefreshTokenSecret(),
      expiresIn: configService.getJwtRefreshTokenDuration(),
    });
  }

  private getEmailConfirmationToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload, {
      secret: configService.getEmailConfirmationTokenSecret(),
      expiresIn: configService.getEmailConfirmationTokenDuration(),
    });
  }
}
