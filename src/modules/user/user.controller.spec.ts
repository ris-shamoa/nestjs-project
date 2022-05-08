import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from '../otp/otp.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
    let userRepository: Repository<User>;
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, {
                provide: getRepositoryToken(User),
                useClass: User,
            },
                {
                    provide: getRepositoryToken(Otp),
                    useClass: Otp,
                }],
        }).compile();

        userController = app.get<UserController>(UserController);
        userService = app.get(UserService);
        userRepository = app.get(getRepositoryToken(User));
    });

    describe('root', () => {
        it('should be defined', () => {
            jest.spyOn(userService, 'login').mockImplementation(async () => true);
            expect(userController).toBeDefined();
        });
    });
});
