import { Body, Controller, Patch, Post } from "@nestjs/common";
import { DtoSendPasswordResetTokenRequest } from "src/api/user/dto/request/DtoSendPasswordResetTokenRequest";
import { UserService } from "src/api/user/user.service";
import { DtoUpdatePasswordRequest } from "src/api/user/dto/request/DtoUpdatePasswordRequest";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/reset-password")
  sendPasswordResetToken(
    @Body() dto: DtoSendPasswordResetTokenRequest,
  ): Promise<void> {
    return this.userService.sendPasswordResetToken(dto);
  }

  @Patch("/password")
  updatePassword(@Body() dto: DtoUpdatePasswordRequest): Promise<void> {
    return this.userService.updatePassword(dto);
  }
}
