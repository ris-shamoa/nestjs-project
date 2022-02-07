import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      console.log('--- value ---', value);
      return value;
    }
    console.log('----here value and metadata ----', value, metatype);
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  // private toValidate(metatype: Function): boolean {
  //   const types: Function[] = [String, Boolean, Number, Array, Object];
  //   return !types.includes(metatype);
  // }
}