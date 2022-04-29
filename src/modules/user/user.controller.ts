import { Body, ConsoleLogger, Controller, Get, HttpException, HttpStatus, Post, UseFilters, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from './user.service';
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/registration")
  async Registration( @Body(new ValidationPipe()) registrationDto: RegistrationDto){
    try{
      return await this.userService.registration(registrationDto);
    }catch (error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }   
  }

  @Post("/login")
  async login( @Body(new ValidationPipe()) LoginDto: LoginDto){
    try{
      console.log("--- login dto -----", LoginDto)
      return await this.userService.login(LoginDto);
    }catch (error){
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }   
  }
}
