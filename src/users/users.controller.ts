import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Res,
  Session,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UpdateDto } from './dto/update.dto';
import { Serializer } from 'src/interceptors/Serializer.interceptor';
import { UserDto } from './dto/userr.dto';
import { AuthService } from './auth.service';

@Controller('user')
@Serializer(UserDto)
export class UsersController {
  constructor(
    private readonly UsersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: AuthDto, @Session() session: any) {
    const user = await this.authService.signUp(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: AuthDto, @Session() session: any) {
    const user = await this.authService.signIn(body);
    session.userId = user.id;
    return user;
  }

  @Get('/current-user')
  getsess(@Session() session: any) {
    console.log(session);
    return session.userId;
  }

  @Post('/logout')
  logoutUser(@Session() session: any) {
    delete session.userId
  }

  // GET SINGAL USER BY ID
  // @UseInterceptors(new SerializerInterceptor(UserDto))
  @Get('/:id')
  async getUserById(@Param('id') id: number, res: Response) {
    if (!(await this.UsersService.getUserByID(id))) {
      throw new NotFoundException('not found ');
    }
    return this.UsersService.getUserByID(id);
  }
  // GET All Users
  @Get()
  getAllUsers(@Query('email') query: string) {
    console.log(query);
    return this.UsersService.getUsersByEmail(query);
  }

  @Patch('/:id')
  updateUser(
    @Param('id') id: number,
    @Res() res: Response,
    @Body() body: UpdateDto,
  ) {
    return this.UsersService.updateUserByID(id, res, body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number, @Res() res: Response) {
    this.UsersService.deleteUserById(id, res);
  }
  // we have to implment cookie-session in nest js
 
 
}

// get /auth/id get single user
// get /auth?email=abc@gmail.com getUserByemail
// patch /auth/:id updat user
// delete /auth/:id delte user by id
// post /auth/login login user by email and password
