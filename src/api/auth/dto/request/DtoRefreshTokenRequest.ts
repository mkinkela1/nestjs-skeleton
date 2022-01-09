import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class DtoRefreshTokenRequest {
  @ApiProperty()
  @IsJWT()
  refreshToken: string;
}
