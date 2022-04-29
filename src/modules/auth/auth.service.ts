import { Injectable } from "@nestjs/common";
import { RegistrationDto } from "../user/dto/registration.dto";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcryptjs'
import { LoginDto } from "../user/dto/login.dto";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }
    async registration(registrationDto: RegistrationDto): Promise<boolean> {
        let createdUser = await this.userService.registration(registrationDto);
        return true;
    }

    async login(loginDto: LoginDto): Promise<string> {
        const userInfo = await this.userService.login(loginDto);
        return userInfo ? 'Login Successful' : 'Please enter correct credentials'
    }
}