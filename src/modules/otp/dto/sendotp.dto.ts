import { IsInt, Length, MaxLength, MinLength } from "class-validator";

export class otpDto {
    @IsInt()
    mobile_number: number;
}