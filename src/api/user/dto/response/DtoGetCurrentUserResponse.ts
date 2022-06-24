import { ApiResponseProperty } from "@nestjs/swagger";

export class DtoGetCurrentUserResponse {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  firstName: string;

  @ApiResponseProperty()
  lastName: string;

  constructor(obj: Partial<DtoGetCurrentUserResponse>) {
    this.id = obj.id;
    this.email = obj.email;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
  }
}
