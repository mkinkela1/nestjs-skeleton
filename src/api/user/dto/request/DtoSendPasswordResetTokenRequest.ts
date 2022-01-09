import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class DtoSendPasswordResetTokenRequest {
  @ApiProperty()
  @IsEmail()
  email: string;
}
