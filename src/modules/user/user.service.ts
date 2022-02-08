import { HttpException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Otp } from '../otp/otp.entity';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User)
  private userRepository: Repository<User>, @InjectRepository(Otp) private otpRepository: Repository<Otp>
  ) { }
  async registration(RegistrationDto: RegistrationDto) {
    let enteredUserData = await this.userRepository.create({
      name: RegistrationDto.name,
      email: RegistrationDto.email,
      mobile_number: RegistrationDto.mobile_number,
      isActive: true
    });
    let dataNew = await this.userRepository.save(enteredUserData);
    console.log('---- entered data ---', enteredUserData, dataNew);

    return enteredUserData;
  }

  async login(loginDto: LoginDto) {
    let userInfo = await this.otpRepository.findOne({ mobile_number: loginDto.mobile_number, otp: loginDto.mobile_number });
    try {
      await this.verifyOtp(loginDto.otp, userInfo.otp);
      return userInfo;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyOtp(plainTextOtp: number, hashedOtp: number) {
    const isOtpMatching = await bcrypt.compare(
      plainTextOtp,
      hashedOtp
    );
    if (!isOtpMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}
