import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ReportsService } from 'src/reports/reports.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TestMiddleware implements NestMiddleware {
  constructor(private report: ReportsService){}
 async use(req: Request, res: Response, next: NextFunction) {
console.log(await this.report.getAllReports())
    console.log('Test Middleware Is Calling before every router is calling');
    res.send(await this.report.getAllReports())
  }
}


// now we have to make the best way to user is presend or not
