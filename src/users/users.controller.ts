import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
@Controller('auth')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: AuthDto, @Res() res: Response) {
    this.UsersService.createUser(body, res);
  }
  // GET SINGAL USER BY ID
  @Get('/:id')
  getUserById(@Param('id') id: number, @Res() res: Response) {
    this.UsersService.getUserByID(id, res);
  }
}

// get /auth?email=abc@gmail.com getUserByemail
// patch /auth/:id updat user
// delete /auth/:id delte user by id
// post /auth/login login user by email and password
