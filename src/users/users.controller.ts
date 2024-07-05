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
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UpdateDto } from './dto/update.dto';
import { UserDto } from './dto/userr.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/user.decorator';
import { Serializer } from '../interceptors/serializer.interceptor';
import { AuthGuard } from '../gards/auth.guard';
import { User } from './user.entity';

@Controller('user')
// @UseInterceptors(CurrentUserInterceptor)
@Serializer(UserDto)
export class UsersController {
  constructor(
    private  UsersService: UsersService,
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
  @UseGuards(AuthGuard)
  // @Roles(['admin'])
  getCurrenUser(@CurrentUser() user: User) {
    return user
  }

  @Post('/logout')
  logoutUser(@Session() session: any) {
    delete session.userId;
  }

  // GET SINGAL USER BY ID
  // @UseInterceptors(new SerializerInterceptor(UserDto))
  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.UsersService.getUserByID(id)
    if (!user) {
      throw new NotFoundException('not found ');
    }
    return user;
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
}

// get /auth/id get single user
// get /auth?email=abc@gmail.com getUserByemail
// patch /auth/:id updat user
// delete /auth/:id delte user by id
// post /auth/login login user by email and password



