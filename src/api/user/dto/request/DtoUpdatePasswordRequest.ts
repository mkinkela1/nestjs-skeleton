import { ApiProperty } from "@nestjs/swagger";
import { IsJWT, IsString, Matches, MinLength } from "class-validator";

export class DtoUpdatePasswordRequest {
  @ApiProperty()
  @IsJWT()
  passwordResetToken: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  newPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  repeatNewPassword: string;
}
