import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../user/dto/login.dto";
import { RegistrationDto } from "../user/dto/registration.dto";
import { AuthService } from './auth.service';

@Controller('authentication')
export class AuthController {
  constructor(private readonly AuthService: AuthService) { }

  @Post()
  async registration(@Body() RegistrationDto: RegistrationDto): Promise<boolean> {
    let registrationAuth = await this.AuthService.registration(RegistrationDto);
    return true;
  }

  async login(@Body() LoginDto: LoginDto): Promise<string> {
    return await this.AuthService.login(LoginDto);
  }
}