import { Injectable } from "@nestjs/common";
import { DtoSendPasswordResetTokenRequest } from "src/api/user/dto/request/DtoSendPasswordResetTokenRequest";
import { JwtService } from "@nestjs/jwt";
import { MailService } from "src/mail/mail.service";
import { User } from "src/entities/user.entity";
import { UserNotFoundException } from "src/exceptions/AuthExceptions";
import { configService } from "src/config/config.service";
import { DtoUpdatePasswordRequest } from "src/api/user/dto/request/DtoUpdatePasswordRequest";
import jwtDecode from "jwt-decode";
import { JwtPayload } from "src/jwt-payload.interface";
import * as bcrypt from "bcrypt";
import {
  ConfirmPasswordDoesntMatchNewPasswordException,
  InvalidPasswordResetTokenException,
} from "src/exceptions/UserExceptions";
import { DtoGetCurrentUserResponse } from "src/api/user/dto/response/DtoGetCurrentUserResponse";
import { DtoUpdateCurrentUserRequest } from "src/api/user/dto/request/DtoUpdateCurrentUserRequest";
import { DtoUpdateCurrentUserResponse } from "src/api/user/dto/response/DtoUpdateCurrentUserResponse";
import { DtoGetAllUsersResponse } from "src/api/user/dto/response/DtoGetAllUsersResponse";
import { UsersRepository } from "src/api/user/users.repository";
import { DtoPaginationResult } from "src/shared/dto/DtoPaginationResult";
import { DtoPaginationRequest } from "src/shared/dto/DtoPaginationRequest";
import { DtoGetAllUsersPaginatedRequest } from "src/api/user/dto/request/DtoGetAllUsersPaginatedRequest";

@Injectable()
export class UserService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async sendPasswordResetToken(
    dto: DtoSendPasswordResetTokenRequest
  ): Promise<void> {
    const { email } = dto;

    const user: User = await this.usersRepository.expectOne({ email });

    const passwordResetToken: string = this.jwtService.sign(
      { ...user },
      {
        secret: configService.getJwtPasswordResetTokenSecret(),
        expiresIn: configService.getJwtPasswordResetTokenDuration(),
      }
    );

    await this.mailService.sendPasswordResetEmail(email, passwordResetToken);

    const salt = await bcrypt.genSalt();
    const hashedPasswordResetToken = await bcrypt.hash(
      passwordResetToken,
      salt
    );

    await this.usersRepository.save({
      ...user,
      passwordResetToken: hashedPasswordResetToken,
    });
  }

  async updatePassword(dto: DtoUpdatePasswordRequest): Promise<void> {
    const { passwordResetToken, newPassword, repeatNewPassword } = dto;

    if (
      !this.jwtService.verify(passwordResetToken, {
        secret: configService.getJwtPasswordResetTokenSecret(),
      })
    )
      throw new InvalidPasswordResetTokenException();

    const { email } = jwtDecode<JwtPayload>(passwordResetToken);
    const user: User = await this.usersRepository.expectOne({ email });

    const checkPasswordResetToken: boolean = await bcrypt.compare(
      passwordResetToken,
      user.passwordResetToken
    );
    if (!checkPasswordResetToken)
      throw new InvalidPasswordResetTokenException();

    if (newPassword !== repeatNewPassword)
      throw new ConfirmPasswordDoesntMatchNewPasswordException();

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(newPassword, salt);

    await this.usersRepository.save({
      ...user,
      password,
      passwordResetToken: null,
    });
  }

  async getCurrentUser(user: User): Promise<DtoGetCurrentUserResponse> {
    return new DtoGetCurrentUserResponse(user);
  }

  async updateCurrentUser(
    user: User,
    dto: DtoUpdateCurrentUserRequest
  ): Promise<DtoUpdateCurrentUserResponse> {
    const updatedUser = await this.usersRepository.save({ ...user, ...dto });

    return new DtoUpdateCurrentUserResponse(updatedUser);
  }

  async getAllUsersPaginated(
    request: DtoGetAllUsersPaginatedRequest
  ): Promise<DtoPaginationResult<DtoGetAllUsersResponse>> {
    const { search, ...meta } = request;

    const {
      data,
      cursor: { beforeCursor, afterCursor },
    } = await this.usersRepository.getAllPaginated(search ?? "", meta);

    return new DtoPaginationResult({
      beforeCursor,
      afterCursor,
      pageSize: meta.pageSize,
      data: data.map((user: User) => new DtoGetAllUsersResponse(user)),
    });
  }

  async deleteUser(user: User): Promise<void> {
    try {
      await this.usersRepository.delete(user.id);
    } catch (e) {
      throw new UserNotFoundException();
    }
  }
}
