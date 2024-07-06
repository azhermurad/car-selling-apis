import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Test Middleware Is Calling before every router is calling',process.env.NODE_ENV);
    next()
  }
}
