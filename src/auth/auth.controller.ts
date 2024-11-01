import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return {
      data: await this.authService.login(loginDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
}
