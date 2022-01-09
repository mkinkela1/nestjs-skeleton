import { HttpStatus, PreconditionFailedException } from "@nestjs/common";
import {
  ConfirmPasswordDoesntMatchNewPassword,
  InvalidEmailVerificationToken,
  InvalidPasswordResetToken,
} from "src/messages";

export class InvalidPasswordResetTokenException extends PreconditionFailedException {
  constructor() {
    super({
      message: InvalidPasswordResetToken,
      statusCode: HttpStatus.PRECONDITION_FAILED,
    });
  }
}

export class ConfirmPasswordDoesntMatchNewPasswordException extends PreconditionFailedException {
  constructor() {
    super({
      message: ConfirmPasswordDoesntMatchNewPassword,
      statusCode: HttpStatus.PRECONDITION_FAILED,
    });
  }
}

export class InvalidEmailVerificationTokenException extends PreconditionFailedException {
  constructor() {
    super({
      message: InvalidEmailVerificationToken,
      statusCode: HttpStatus.PRECONDITION_FAILED,
    });
  }
}
