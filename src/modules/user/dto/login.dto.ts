import { IsInt, Length } from "class-validator";

export class LoginDto {
    @IsInt()
    @Length(10)
    mobile_number: number;
 
    @IsInt()
    @Length(4)
    otp: number;
}