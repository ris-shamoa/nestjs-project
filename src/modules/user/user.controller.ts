import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from './user.service';
import { Request } from 'express';
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseInterceptors(FileInterceptor('file'))
  @Post("/registration")
  async Registration(@Body(new ValidationPipe()) registrationDto: RegistrationDto) {
    try {
      return await this.userService.registration(registrationDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("/login")
  async login(@Body(new ValidationPipe()) LoginDto: LoginDto) {
    try {
      return await this.userService.login(LoginDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get("uploadDocFromUrl")
  async uploadDoc(@Req() request: Request) {
    try {
      let { url, userId } = request.query;
      return await this.userService.uploadDocFromUrl(userId, url);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
