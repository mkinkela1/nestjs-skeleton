import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { configService } from "src/config/config.service";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: configService.getSmtpHost(),
        secure: true,
        auth: {
          user: configService.getSmtpUsername(),
          pass: configService.getSmtpPassword(),
        },
      },
      defaults: {
        from: `"No reply", ${configService.getDefaultNoReplyEmail()}`,
      },
      template: {
        dir: process.cwd() + "/dist/mail/templates/",
        adapter: new HandlebarsAdapter(),
        options: { strict: false },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
