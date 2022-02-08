import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [UserModule, PassportModule, ConfigModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: {
                expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
            },
        }),
    })],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule { }