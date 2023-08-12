import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/auth-register';
import { LoginUserDto } from './dto/auth-login';
import { IsPublic } from 'src/decorators/isPublic.decorator';
import { CookieInterceptor } from 'src/interceptors/cookie.interceptor';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'auth', version: '1' })
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @IsPublic()
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @IsPublic()
  @UseInterceptors(CookieInterceptor)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('me')
  getMe(@Request() request) {
    return this.authService.getMe(request.user);
  }
}
