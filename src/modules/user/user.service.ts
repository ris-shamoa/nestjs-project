import { HttpException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistrationDto } from './dto/registration.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor( @InjectRepository(User)
     private userRepository: Repository<User>
  ){}
  async registration(RegistrationDto: RegistrationDto) {
    let enteredUserData = await this.userRepository.create({
      name: RegistrationDto.name,
      age: RegistrationDto.age,
      email: RegistrationDto.email,
      mobile_number: RegistrationDto.mobile_number,
      password: RegistrationDto.password,
      isActive: true
    });
    let dataNew = await this.userRepository.save(enteredUserData);
    console.log('---- entered data ---', enteredUserData, dataNew);

    return enteredUserData ? 'user registered': 'error occured'
  }
}
