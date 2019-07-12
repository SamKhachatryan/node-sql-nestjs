import { IsEmail, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiModelProperty()
  @MinLength(6)
  readonly username: string;

  @ApiModelProperty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @MinLength(6)
  readonly password: string;
}