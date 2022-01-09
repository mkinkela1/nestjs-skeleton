import { Body, Controller, Post } from "@nestjs/common";
import { DtoAuthCredentials } from "src/api/auth/dto/DtoAuthCredentials";
import { AuthService } from "src/api/auth/auth.service";
import { DtoSignInResponse } from "src/api/auth/dto/response/DtoSignInResponse";
import { ApiTags } from "@nestjs/swagger";
import { DtoVerifyEmailRequest } from "src/api/auth/dto/request/DtoVerifyEmailRequest";
import { DtoRefreshTokenRequest } from "src/api/auth/dto/request/DtoRefreshTokenRequest";
import { DtoRefreshTokenResponse } from "./dto/response/DtoRefreshTokenResponse";
import { DtoResendVerificationEmailRequest } from "src/api/auth/dto/request/DtoResendVerificationEmailRequest";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  signUp(@Body() dto: DtoAuthCredentials): Promise<void> {
    return this.authService.signUp(dto);
  }

  @Post("/signin")
  signIn(@Body() dto: DtoAuthCredentials): Promise<DtoSignInResponse> {
    return this.authService.signIn(dto);
  }

  @Post("/refresh-token")
  refreshToken(
    @Body() dto: DtoRefreshTokenRequest,
  ): Promise<DtoRefreshTokenResponse> {
    return this.authService.refreshToken(dto);
  }

  @Post("/verify-email")
  verifyEmail(@Body() dto: DtoVerifyEmailRequest): Promise<void> {
    return this.authService.verifyEmail(dto);
  }

  @Post("/resend-verification-email")
  resendVerificationEmail(
    @Body() dto: DtoResendVerificationEmailRequest,
  ): Promise<void> {
    return this.authService.resendVerificationEmail(dto);
  }
}
