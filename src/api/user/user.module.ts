import { Module } from "@nestjs/common";
import { UserService } from "src/api/user/user.service";
import { UserController } from "src/api/user/user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailModule } from "src/mail/mail.module";
import { JwtModule } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { UsersRepository } from "src/api/user/users.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UsersRepository]),
    JwtModule.register({}),
    MailModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
