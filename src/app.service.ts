import { HttpException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
