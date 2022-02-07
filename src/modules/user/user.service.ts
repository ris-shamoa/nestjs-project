import { HttpException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';

@Injectable()
export class UserService {
  async registration(RegistrationDto: RegistrationDto) {
    return "Hello form nest js.";
  }
}
