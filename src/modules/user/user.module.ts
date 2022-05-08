import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Otp } from '../otp/otp.entity';
import { FileModule } from '../files/files.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [TypeOrmModule.forFeature([User, Otp]), FileModule, HttpModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
