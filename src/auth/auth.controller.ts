import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return {
      data: await this.authService.login(loginDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  // @Post('logout')
  // async logout(@Req() req) {
  //   return {
  //     data: await this.authService.logout(req?.users?.session_id),
  //     statusCode: HttpStatus.CREATED,
  //     message: 'success',
  //   };
  // }
  //
  // @Public()
  // @Post('refresh-token')
  // async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return {
  //     data: await this.authService.refreshToken(refreshTokenDto.refresh_token),
  //     statusCode: HttpStatus.CREATED,
  //     message: 'success',
  //   };
  // }
}
