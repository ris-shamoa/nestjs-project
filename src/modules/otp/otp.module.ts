import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { OtpController } from "./otp.controller";
import { Otp } from "./otp.entity";
import { OtpService } from "./otp.service";

@Module({
  imports: [TypeOrmModule.forFeature([Otp, User])],
  providers: [OtpService],
  controllers: [OtpController],
  exports:[OtpService]
})
export class OtpModule { }