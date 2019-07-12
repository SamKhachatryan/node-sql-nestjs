import { Get, Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from './shared/guards/auth';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('api')
export class AppController {

  
  @Get()
  @UseGuards(AuthGuard)
  root(): string {
    return 'Api works';
  }
}