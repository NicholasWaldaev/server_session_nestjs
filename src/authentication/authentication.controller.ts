import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/registration.dto';
import { CookieAuthenticationGuard } from './guard/cookieAuthentication.guard';
import { LogInWithCredentialsGuard } from './guard/logInWithCredentialsGuard';
import RequestWithUser from './requestWithUser.interface';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() registerionData: RegisterDto) {
    return this.authenticationService.register(registerionData);
  }

  @HttpCode(200)
  @UseGuards(LogInWithCredentialsGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser) {
    request.session.destroy(function () {
      console.log('Done logging out.');
    });
  }
}
