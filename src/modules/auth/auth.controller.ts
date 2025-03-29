import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto/create-auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { GlobalResponse } from 'src/common/globalResponse';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  welcome() {
    return 'Welcome to NestJS Backend';
  }
  @Public()
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpDto: SignUpDto): Promise<GlobalResponse> {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  requestOtp(@Body() signInDto: SignInDto): Promise<GlobalResponse> {
    return this.authService.signIn(signInDto);
  }
}
