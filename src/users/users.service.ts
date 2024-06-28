import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(
    { email, password }: { email: string; password: string },
    res: Response,
  ) {
    const user = this.usersRepository.create({ email, password });
    await this.usersRepository.save(user);

    res.status(201).json(user);
  }
 async getUserByID(id: any, res: Response) {
    console.log(id);
    const user = await this.usersRepository.findBy({id:id})
    console.log(user)
    res.status(200).json(user);
  }
}
