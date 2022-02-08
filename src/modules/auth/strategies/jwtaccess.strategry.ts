import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy){
    constructor( private readonly configService: ConfigService, private readonly userService:UserService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
        })
    }
     
}