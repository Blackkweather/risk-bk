import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    //return new UserEntity(await this.auth.login(dto));
    return await this.auth.login(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.auth.register(dto);
  }
}
