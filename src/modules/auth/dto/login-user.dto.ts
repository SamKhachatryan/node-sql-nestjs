import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {

  @IsNotEmpty()
  @ApiModelProperty()
  readonly username: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly password: string;
}