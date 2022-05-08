import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Otp } from "../otp/otp.entity";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

describe('The Registration', () => {
    let userService: UserService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, {
                provide: getRepositoryToken(User),
                useClass: User,
            }, {
                    provide: getRepositoryToken(Otp),
                    useClass: Otp,
                }],
        }).compile()
        userService = await module.get<UserService>(UserService);
    })
    describe('registration', () => {
        it('should return true', async () => {
            let user = {
                "name": "ABC",
                "mobile_number": "1234567892",
                "email": "abc@gmail.com",
            }
            // jest.spyOn(userService, 'registration').mockImplementation(async () => {})
            await expect(
                userService
            ).toBeDefined()
        })
    })
});