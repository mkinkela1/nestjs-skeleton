import { Module } from "@nestjs/common";
import { AuthService } from "src/api/auth/auth.service";
import { AuthController } from "src/api/auth/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { configService } from "src/config/config.service";
import { JwtTokenStrategy } from "src/api/auth/jwt-token.strategy";
import { MailModule } from "src/mail/mail.module";
import { JwtRefreshTokenStrategy } from "src/api/auth/jwt-refresh-token.strategy";
import { UsersRepository } from "src/api/user/users.repository";
import { User } from "src/entities/user.entity";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: configService.getJwtTokenSecret(),
      signOptions: { expiresIn: configService.getJwtTokenDuration() },
    }),
    MailModule,
    TypeOrmModule.forFeature([User, UsersRepository]),
  ],
  providers: [AuthService, JwtTokenStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
  exports: [
    JwtTokenStrategy,
    JwtRefreshTokenStrategy,
    PassportModule,
    TypeOrmModule.forFeature([User, UsersRepository]),
    JwtModule.register({}),
  ],
})
export class AuthModule {}
