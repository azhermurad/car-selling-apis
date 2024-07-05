import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('authService test case:', () => {
  let authService: AuthService;
  let fakeSevices: Partial<UsersService>;

  // this hook is called before each test case in this describe
  beforeEach(async () => {
    fakeSevices = {
      createUser: ({ email, password }: { email: string; password: string }) =>{

        return Promise.resolve({ id: 1, email, password })
      },
      getUsersByEmail: () => Promise.resolve([]),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeSevices },
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });
  // first test case:
  it('Password Shold be hash', async () => {
  
    expect(authService).toBeDefined();
    const user = await authService.signUp({
      email: 'azher@gmail.com',
      password: 'azher',
    });
    expect(user.password).not.toEqual('azher');
  });

  it('should throw BadRequestException if email already exists', async () => {
    fakeSevices.getUsersByEmail = () =>
      Promise.resolve([
        { id: 1, email: 'azher@gamil.com', password: '134567' },
      ]);

    // await expect(
    //   authService.signUp({
    //     email: 'azher@gmail.com',
    //     password: 'azher',
    //   }),
    // ).rejects.toThrow(BadRequestException);

    try {
      await authService.signUp({
        email: 'azher@gmail.com',
        password: 'azher',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Email Already Exists');
    }
  });

  describe('signin test case', () => {
    it('should throw error when no user found with the email', async () => {
      try {
        await authService.signIn({
          email: 'azher@gmail.com',
          password: 'azher',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('No User found by this email!');
      }
    });

    it('Should throw Error when Password is not match', async () => {
      fakeSevices.getUsersByEmail = () =>
        Promise.resolve([
          { id: 1, email: 'azher@gamil.com', password: '134567' },
        ]);
      try {
        await authService.signIn({
          email: 'azher@gmail.com',
          password: 'azher',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Password is not match');
      }
    });

    it('Should return user when email and password are correct', async () => {
      const hashPassword = await bcrypt.hash('azher', 10);
      fakeSevices.getUsersByEmail = () =>
        Promise.resolve([
          { id: 1, email: 'azher@gamil.com', password: hashPassword },
        ]);

      const user = await authService.signIn({
        email: 'azher@gmail.com',
        password: 'azher',
      });
      expect(user).not.toBeNull();
    });
  });
});
