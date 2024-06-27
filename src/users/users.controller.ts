import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('users')
export class UsersController {
  // login user
  //   now we have to validata the incoming data to this router
  // email and password
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  signUp(@Body() authDto: AuthDto) {
    console.log(authDto)
    return 'user is created in database';
  }
  @Post()
  loginUser() {
    return 'user is login';
  }
}

// we have to create two routes for handling user
// 1. login user
// 2. register user
