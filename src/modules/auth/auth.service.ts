import { Injectable } from "@nestjs/common";
import { RegistrationDto } from "../user/dto/registration.dto";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcryptjs'
import { LoginDto } from "../user/dto/login.dto";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }
    async registration(registrationDto: RegistrationDto): Promise<User> {
    //     const hashedPassword = await bcrypt.hash(registrationDto.password, 10);
    //     console.log('---- hashed password ----', hashedPassword);
        let createdUser = await this.userService.registration(registrationDto);
        return createdUser;
    }

    async login(loginDto: LoginDto):Promise<string> {
        const userInfo = await this.userService.login(loginDto);
        return userInfo ? 'Login Successful' : 'Please enter correct credentials'
    }
}