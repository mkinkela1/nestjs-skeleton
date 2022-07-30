import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { DtoSendPasswordResetTokenRequest } from "src/api/user/dto/request/DtoSendPasswordResetTokenRequest";
import { UserService } from "src/api/user/user.service";
import { DtoUpdatePasswordRequest } from "src/api/user/dto/request/DtoUpdatePasswordRequest";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/api/auth/jwt-auth.guard";
import { CurrentUser } from "src/api/auth/get-user.decorator";
import { User } from "src/entities/user.entity";
import { DtoGetCurrentUserResponse } from "src/api/user/dto/response/DtoGetCurrentUserResponse";
import { DtoUpdateCurrentUserRequest } from "src/api/user/dto/request/DtoUpdateCurrentUserRequest";
import { DtoUpdateCurrentUserResponse } from "src/api/user/dto/response/DtoUpdateCurrentUserResponse";
import { DtoGetAllUsersResponse } from "src/api/user/dto/response/DtoGetAllUsersResponse";
import { DtoPaginationResult } from "src/shared/dto/DtoPaginationResult";
import { DtoGetAllUsersPaginatedRequest } from "src/api/user/dto/request/DtoGetAllUsersPaginatedRequest";

@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/reset-password")
  sendPasswordResetToken(
    @Body() dto: DtoSendPasswordResetTokenRequest
  ): Promise<void> {
    return this.userService.sendPasswordResetToken(dto);
  }

  @Patch("/password")
  updatePassword(@Body() dto: DtoUpdatePasswordRequest): Promise<void> {
    return this.userService.updatePassword(dto);
  }

  @ApiBearerAuth("JWT")
  @UseGuards(JwtAuthGuard)
  @Put()
  updateCurrentUser(
    @CurrentUser() user: User,
    @Body() dto: DtoUpdateCurrentUserRequest
  ): Promise<DtoUpdateCurrentUserResponse> {
    return this.userService.updateCurrentUser(user, dto);
  }

  @ApiBearerAuth("JWT")
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsersPaginated(
    @Query() request: DtoGetAllUsersPaginatedRequest
  ): Promise<DtoPaginationResult<DtoGetAllUsersResponse>> {
    return this.userService.getAllUsersPaginated(request);
  }

  @ApiBearerAuth("JWT")
  @UseGuards(JwtAuthGuard)
  @Get("/me")
  getCurrentUser(
    @CurrentUser() user: User
  ): Promise<DtoGetCurrentUserResponse> {
    return this.userService.getCurrentUser(user);
  }

  @ApiBearerAuth("JWT")
  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteUser(@CurrentUser() user: User): Promise<void> {
    return this.userService.deleteUser(user);
  }
}
