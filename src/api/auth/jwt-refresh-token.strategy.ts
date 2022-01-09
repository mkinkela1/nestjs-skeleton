import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "src/api/auth/users.repository";
import { configService } from "src/config/config.service";
import { JwtPayload } from "src/jwt-payload.interface";
import { User } from "src/entities/user.entity";

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh-token",
) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: configService.getJwtRefreshTokenSecret(),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromBodyField("refresh_token"),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;

    return await this.usersRepository.expectOne({ email });
  }
}
