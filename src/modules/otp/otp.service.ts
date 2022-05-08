import { addMinutes } from "date-fns";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Otp } from "./otp.entity";
import { User } from "../user/user.entity";
import * as bcrypt from 'bcryptjs';
@Injectable()
export class OtpService {
    constructor(@InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
        @InjectRepository(User)
        private userRepository: Repository<User>) { }

    async sendOtp(mobile_number): Promise<number> {
        let otp;
        if (process.env.NODE_ENV == 'DEVELOPMENT') {
            otp = 1234;
        } else {
            otp = Math.floor(1000 + Math.random() * 9000);
        }
        const hashedotp = await bcrypt.hash(`${otp}`, 10);
        let expiry = addMinutes(new Date(), 10); // otp is valid for 10 mins
        let user = await this.userRepository.findOne({ mobile_number: mobile_number });
        if (!user) {
            user = this.userRepository.create({ mobile_number: mobile_number, status: 'otp-generated' });
            user = await this.userRepository.save(user);
        }
        let saveOtp = this.otpRepository.create({
            otp: hashedotp,
            mobile_number: mobile_number,
            expiry: expiry,
            user: user,
            status: 'not-verified'
        })
        await this.otpRepository.save(saveOtp);
        return otp;
    }
}