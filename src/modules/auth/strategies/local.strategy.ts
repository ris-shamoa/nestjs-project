import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { LoginDto } from "src/modules/user/dto/login.dto";
import { User } from "src/modules/user/user.entity";
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'otp'
        })
    }
    async validate(loginDto: LoginDto): Promise<string> {
        return this.authService.login(loginDto);
    }
}