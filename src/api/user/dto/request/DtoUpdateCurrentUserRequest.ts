import { ApiProperty } from "@nestjs/swagger";

export class DtoUpdateCurrentUserRequest {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}
