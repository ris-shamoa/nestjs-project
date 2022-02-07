import { HttpException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello form nest js.";
    //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //   throw new HttpException({
  //     status: HttpStatus.FORBIDDEN,
  //     error: 'This is a my new error message',
  //   }, HttpStatus.FORBIDDEN);
  }
}
