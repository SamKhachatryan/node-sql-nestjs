import { Post, Controller, UsePipes, Body } from '@nestjs/common';

import { AuthService } from './service';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';

@ApiBearerAuth()
@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {}


  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.generateJWT(loginUserDto)
  }
}
