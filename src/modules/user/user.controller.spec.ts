import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
    let userController: UserController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService],
        }).compile();

        userController = app.get<UserController>(UserController);
    });

    describe('root', () => {
        it('should return true', () => {
            let loginDTO = {
                "mobile_number": "1234567892",
                "otp": 6355
            }
            expect(userController.login(loginDTO)).toBe(true);
        });
    });
});
