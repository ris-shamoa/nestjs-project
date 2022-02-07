import { Body, Controller, Get, HttpException, HttpStatus, Post, UseFilters, ValidationPipe } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async Registration( @Body(new ValidationPipe()) registrationDto: RegistrationDto){
      return await this.userService.registration(registrationDto);
  }
}
