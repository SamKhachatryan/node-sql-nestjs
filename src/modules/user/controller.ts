import { Get, Post, Delete, Param, Controller, UsePipes, Body, UseGuards } from '@nestjs/common';

import { UserService } from './service';
import { CreateUserDto } from './dto/create-user';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth';
import { UserEntity } from '../../entities/user.entity';
import { User } from '../../shared/decorators/user';
import { FindOneParams } from './dto/find-one-params';

@ApiBearerAuth()
@ApiUseTags('user')
@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard)
  async findMe(@User() user: UserEntity) {
    return user;
  }

  @Get('all')
  async allUsers() {
    return await this.userService.findAll();
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete('delete/:id')
  @UsePipes(ValidationPipe)
  async delete(@Param() params: FindOneParams) {
    return await this.userService.delete(params.id);
  }
}
