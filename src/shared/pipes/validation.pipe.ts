import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CustomException } from '../models/custom-exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {

    if (!value) {
      throw new CustomException('No data submitted');
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new CustomException(this.buildError(errors));
    }
    return value;
  }

  private buildError(errors): string {
    const result = [];
    errors.forEach(el => {
      Object.entries(el.constraints).forEach(constraint => {
        result.push(constraint[1]);
      });
    });
    return result.join(', ');
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
