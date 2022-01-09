import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class DtoResendVerificationEmailRequest {
  @ApiProperty()
  @IsEmail()
  email: string;
}
