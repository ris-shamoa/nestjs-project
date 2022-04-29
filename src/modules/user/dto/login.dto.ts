import { IsInt, IsString, Length } from "class-validator";

export class LoginDto {
    @IsString()
    mobile_number: string;
 
    @IsInt()
    otp: number;
}