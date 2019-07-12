
import { IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FindOneParams {
  
  @ApiModelProperty()
  @IsNumberString()
  id: number;
}
