import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';


interface IRequest extends Request {
    currentUser: User
}


@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
 async use(req: IRequest, res: Response, next: NextFunction) {
    const userId = req?.session?.userId;

    if(userId){
        const user = await this.userService.getUserByID(userId)
        req.currentUser = user;
    }
    next();
  }
}
