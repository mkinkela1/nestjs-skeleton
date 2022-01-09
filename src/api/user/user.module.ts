import { Module } from "@nestjs/common";
import { UserService } from "src/api/user/user.service";
import { UserController } from "src/api/user/user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersRepository } from "src/api/auth/users.repository";
import { MailModule } from "src/mail/mail.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    JwtModule.register({}),
    MailModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
