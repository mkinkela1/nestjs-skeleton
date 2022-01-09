import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendConfirmationEmail(to: string, confirmationToken: string) {
    await this.mailerService.sendMail({
      to,
      subject: "Confirmation",
      template: "confirmation",
      context: {
        confirmationToken,
      },
    });
  }

  async sendPasswordResetEmail(to: string, passwordResetToken: string) {
    await this.mailerService.sendMail({
      to,
      subject: "Password reset",
      template: "password_reset",
      context: {
        passwordResetToken,
      },
    });
  }
}
