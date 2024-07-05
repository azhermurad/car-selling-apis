import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

describe('UserController', () => {
  let controller: UsersController;
  // let usersev: UsersService;
  let fackUserService: Partial<UsersService>;
  let fakeAuthSevice: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthSevice = {
      signUp: (user) => Promise.resolve({ ...user, id: 1 }),
      signIn: jest
        .fn()
        .mockImplementation((user) => Promise.resolve({ ...user, id: 1 })),
    };
    fackUserService = {
      getUserByID: jest.fn().mockImplementation((id: number) =>
        Promise.resolve({
          id,
          email: 'azher@gmail.com',
          password: 'azher',
        }),
      ),
      getUsersByEmail: jest.fn(),
      updateUserByID: jest.fn(),
      deleteUserById: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: AuthService, useValue: fakeAuthSevice },
        { provide: UsersService, useValue: fackUserService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    // usersev = module.get<UsersService>(UsersService);  // according to nest documentation step one
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user on signUp', async () => {
    let body = { email: 'azher@gmail.com', password: 'azher' };
    const session = {};
    const user = await controller.createUser(body, session);
    expect(user).toBeDefined();
    expect(user.email).toEqual(body.email);
    expect(session['userId']).toEqual(1);
  });

  it('should signIn a user on signUp', async () => {
    let body = { email: 'azher@gmail.com', password: 'azher' };
    const session = {};
    const user = await controller.signin(body, session);
    expect(user).toBeDefined();
    expect(user.email).toEqual(body.email);
    expect(session['userId']).toEqual(1);
  });

  it('should return a current User', () => {
    let curentUser = { email: 'azher@gmail.com', password: 'azher', id: 1 };
    const user = controller.getCurrenUser(curentUser);
    expect(user).toBeDefined();
    expect(user.email).toEqual(curentUser.email);
  });

  it('Get user By it Id', async () => {
    let id = 1;
    const user = await controller.getUserById(id);
    expect(user.id).toEqual(1);
  });

  //  ACCORDING TO THE NEST DOUCMENTATION

  // it('Get', async () => {
  //   jest.spyOn(usersev, 'getUserByID') .mockImplementation((id: number) =>
  //     Promise.resolve({
  //       id,
  //       email: 'azher@gmail.com',
  //       password: 'azher',
  //     }),
  //   );
  //   const user = await controller.getUserById(1)
  //   console.log(user)
  //   // another way to testing controller method
  // });
});

