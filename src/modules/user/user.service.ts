import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { Otp } from '../otp/otp.entity';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { FileService } from '../files/files.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
    @Inject(forwardRef(() => FileService))
    private filesService: FileService,
    private httpService: HttpService,
  ) { }

  async registration(RegistrationDto: RegistrationDto) {
    let uploadImage: any;
    let user: any;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    let enteredUserData = await this.userRepository.create({
      name: RegistrationDto.name,
      email: RegistrationDto.email,
      mobile_number: RegistrationDto.mobile_number,
      is_active: true
    });
    await queryRunner.startTransaction();

    try {
      user = await queryRunner.manager.save(enteredUserData);
      uploadImage = await this.filesService.uploadFile(RegistrationDto.image, "profileImage", user.id, "image_upload");
      // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);  
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    }
    await this.uploadedImage(user.id, uploadImage.Location);
    return {};
  }

  async uploadDocFromUrl(userId, url) {
    const { data } = await firstValueFrom(this.httpService.get(url, {
      responseType: "arraybuffer",
    }
    ));
    let Location = await this.filesService.uploadFile(data, "prescription", userId, "prescription_upload")
    await this.userRepository.update({ id: userId }, { prescription: Location });
    return Location;
  }

  async uploadedImage(userId, location) {
    const file = await this.userRepository.update({ id: userId }, { profile_image: location });
    return file;
  }

  async login(loginDto: LoginDto) {
    let userInfo = await this.otpRepository.findOne({ mobile_number: loginDto.mobile_number });
    await this.verifyOtp(loginDto.otp, userInfo.otp);
    return true;
  }

  private async verifyOtp(plainTextOtp, hashedOtp) {
    const hashedotp = await bcrypt.hash(`${plainTextOtp}`, 10);
    const isOtpMatching = await bcrypt.compare(
      hashedotp,
      hashedOtp
    );
    return isOtpMatching;
  }
}
