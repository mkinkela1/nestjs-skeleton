import { ApiResponseProperty } from "@nestjs/swagger";
import { IsEmail, IsUUID } from "class-validator";
import { User } from "src/entities/user.entity";

export class DtoGetAllUsersResponse {
  @ApiResponseProperty()
  @IsUUID()
  id: string;

  @ApiResponseProperty()
  @IsEmail()
  email: string;

  @ApiResponseProperty()
  firstName: string;

  @ApiResponseProperty()
  lastName: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
  }
}
