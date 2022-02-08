import { IsInt, Length } from "class-validator";

export class otpDto {
    @IsInt()
    @Length(4)
    mobile_number: number;
}