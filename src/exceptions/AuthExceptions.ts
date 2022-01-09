import {
  ConflictException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  WrongEmailOrPassword,
  EmailAlreadyExists,
  UserNotFound,
} from "src/messages";

export class WrongEmailOrPasswordException extends UnauthorizedException {
  constructor() {
    super({
      message: WrongEmailOrPassword,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}

export class EmailAlreadyExistsException extends ConflictException {
  constructor() {
    super({
      message: EmailAlreadyExists,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super({
      message: UserNotFound,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
