import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Otp } from '../otp/otp.entity';
import { OtpModule } from '../otp/otp.module';
@Module({
  imports: [TypeOrmModule.forFeature([User, Otp])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
