import { IsString, IsInt, Length, IsEmail } from 'class-validator';

export class RegistrationDto {
  @IsString()
  name: string;

  @IsInt()
  mobile_number: number;

  @IsEmail()
  email: string;

}