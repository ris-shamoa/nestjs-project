import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Otp } from '../otp/otp.entity';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>
  ) { }
  async registration(RegistrationDto: RegistrationDto) {
    let enteredUserData = await this.userRepository.create({
      name: RegistrationDto.name,
      email: RegistrationDto.email,
      mobile_number: RegistrationDto.mobile_number,
      isActive: true
    });
    await this.userRepository.save(enteredUserData);
    return true;
  }

  async login(loginDto: LoginDto) {
    let userInfo = await this.otpRepository.findOne({ mobile_number: loginDto.mobile_number });
    await this.verifyOtp(loginDto.otp, userInfo.otp);
    return true;
  }

  private async verifyOtp(plainTextOtp, hashedOtp) {
    const isOtpMatching = await bcrypt.compare(
      plainTextOtp,
      hashedOtp
    );
    console.log("is otp matching ------", isOtpMatching)
    return true;
  }
}
