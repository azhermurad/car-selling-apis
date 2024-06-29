import { Injectable, NotFoundException, Res } from '@nestjs/common';
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
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    res.status(200).json(user);
  }

  // GET all USERS USING EMAIL
  async getUsersByEmail(email: string, res: Response) {
    const user = await this.usersRepository.findBy({ email });
    res.status(200).json(user);
  }

  // UPDATE USER BY ID
  async updateUserByID(id: number, res: Response, data: Partial<User>) {
    let user = await this.usersRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('No User Found In Database!!!');
      }
      Object.assign(user, data);
      user = await this.usersRepository.save(user);
      // res.status(200).json(user);
      return user
    
  }

  async deleteUserById(id: number, res: Response) {
    const user = await this.usersRepository.delete(id);
    res.status(200).json(user);
  }
}
