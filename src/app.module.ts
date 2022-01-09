import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configService } from "src/config/config.service";
import { AuthModule } from "src/api/auth/auth.module";
import { MailModule } from "src/mail/mail.module";
import { UserModule } from "src/api/user/user.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    MailModule,
    UserModule,
  ],
})
export class AppModule {}
