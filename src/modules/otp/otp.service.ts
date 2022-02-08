import { addMinutes } from "date-fns";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Otp } from "./otp.entity";
import { Injector } from "@nestjs/core/injector/injector";
import { User } from "../user/user.entity";


@Injectable()
export class OtpService {
    constructor(@InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
        @InjectRepository(User)
        private userRepository: Repository<User>) { }

    async sendOtp(mobile_number: number): Promise<boolean> {
        let otp;
        if (process.env.NODE_ENV == 'DEVELOPMENT') {
            otp = 1234;
        } else {
            otp = Math.floor(1000 + Math.random() * 9000);
        }

        let expiry = addMinutes(new Date(), 10); // otp is valid for 10 mins
        let user = await this.userRepository.findOne({ mobile_number: mobile_number });
        if (!user) {
            user = this.userRepository.create({ mobile_number: mobile_number, status: 'otp-generated'});
            user = await this.userRepository.save(user);
        }
        let saveOtp = this.otpRepository.create({
            otp: otp,
            mobile_number: mobile_number,
            expiry: expiry,
            user: user,
            status: 'not-verified'
        })
        await this.otpRepository.save(saveOtp);
        return saveOtp ? true : false
    }
}