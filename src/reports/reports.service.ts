import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import {plainToInstance} from "class-transformer";
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,
  ) {}
// GET ALL REPOSE 
async getAllReports(){
 return await this.reportRepo.find({relations:{user:true}})
}

// CREATE REPOST
async createReport(report:CreateReportDto,user:User){
    // we have to save report to database 
    
    const ObjectToIntace = plainToInstance(Report,report)
    ObjectToIntace.user=user
    const rept = await this.reportRepo.save(ObjectToIntace)
    return rept
}

// UPDATE REPORT
updateReport(report:Report){
    return "update report"
}



}





// now we have to learn the assosiation in of the database so taht the user can easily understant the databse concept so that the user is the most import