import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

describe('The Registration', () => {
    let userService: UserService;
    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).compile()
        userService = await moduleRef.get<UserService>(UserService);
    })
    describe('registration', () => {
        it('should return true', () => {
            let user = {
                "name": "ABC",
                "mobile_number": "1234567892",
                "email": "abc@gmail.com",
            }
            expect(
                userService.registration(user)
            ).toEqual(true)
        })
    })
});