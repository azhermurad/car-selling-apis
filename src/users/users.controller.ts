import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res } from '@nestjs/common';
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
  // GET All Users
  @Get()
  getAllUsers(@Query("email") query: string ,@Res() res: Response) {
    console.log(query)
    this.UsersService.getUsersByEmail(query,res);
  }

  @Patch('/:id')
  updateUser( @Param('id') id: number, @Res() res: Response, @Body() body: AuthDto,) {
   return this.UsersService.updateUserByID(id, res, body);
  }

  @Delete("/:id")
  deleteUser(@Param('id') id: number, @Res() res: Response) {
    this.UsersService.deleteUserById(id, res);
  }
}

// get /auth/id get single user
// get /auth?email=abc@gmail.com getUserByemail
// patch /auth/:id updat user
// delete /auth/:id delte user by id
// post /auth/login login user by email and password
