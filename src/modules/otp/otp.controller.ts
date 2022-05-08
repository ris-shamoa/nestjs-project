import { Body, Controller, Post } from "@nestjs/common";
import { otpDto } from "./dto/sendotp.dto";
import { OtpService } from "./otp.service"

@Controller()
export class OtpController {
    constructor(private readonly OtpService: OtpService) { }

    @Post('/sendOtp')
    async sendOtp(@Body() sendotpDto: otpDto): Promise<number> {
        let sendOtp = await this.OtpService.sendOtp(sendotpDto.mobile_number);
        return sendOtp;
    }
}