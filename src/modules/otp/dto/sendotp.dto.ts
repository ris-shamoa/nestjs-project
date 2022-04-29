import { IsString } from "class-validator";

export class otpDto {
    @IsString()
    mobile_number: string; // this is the change
}