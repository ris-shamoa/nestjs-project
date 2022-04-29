import { IsString, IsInt, IsEmail } from 'class-validator';

export class RegistrationDto {
  @IsString()
  name: string;

  @IsString()
  mobile_number: string;

  @IsEmail()
  email: string;
}