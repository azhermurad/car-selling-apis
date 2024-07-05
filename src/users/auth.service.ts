import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}
  async signUp(body: AuthDto) {
    // check user is exist in database
    const isUserExit = await this.userService.getUsersByEmail(body.email);
    if (isUserExit.length > 0) {
      throw new BadRequestException('Email Already Exists');
    }
    // hash password before save
    const hashPassword = await bcrypt.hash(body.password, 10);
    body.password = hashPassword;
    // create user
    const user = this.userService.createUser(body);
    return user;
  }

  async signIn(body: AuthDto) {
    const isUserExit = await this.userService.getUsersByEmail(body.email);
    if (isUserExit.length == 0) {
      throw new BadRequestException('No User found by this email!');
    }
    const isPasswordMatch = await bcrypt.compare(
      body.password,
      isUserExit[0].password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Password is not match');
    }
    return isUserExit[0];
  }
}
