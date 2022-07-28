import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/api/auth/auth.module";
import { MailModule } from "src/mail/mail.module";
import { UserModule } from "src/api/user/user.module";
import { ConfigModule } from "@nestjs/config";
import { configService } from "src/config/config.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    MailModule,
    UserModule,
  ],
})
export class AppModule {}
