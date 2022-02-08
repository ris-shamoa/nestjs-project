import { Body, Controller, Get, HttpException, HttpStatus, Post, UseFilters, ValidationPipe } from '@nestjs/common';
import { nextTick } from 'process';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from './user.service';
@Controller('registration')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async Registration( @Body(new ValidationPipe()) registrationDto: RegistrationDto){
    try{
      return await this.userService.registration(registrationDto);
    }catch (error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }   
  }
}
