import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../user/dto/login.dto";
import { RegistrationDto } from "../user/dto/registration.dto";
import { User } from "../user/user.entity";
import { AuthService } from './auth.service';

@Controller('authentication')
export class AuthController {
  constructor( private readonly AuthService: AuthService) {  }

  @Post()
  async registration (@Body() RegistrationDto: RegistrationDto): Promise<User>{
      let registrationAuth = await this.AuthService.registration(RegistrationDto);
      return registrationAuth;
  }

  async login (@Body() LoginDto: LoginDto): Promise<string> {
    return await this.AuthService.login(LoginDto);
  }
}