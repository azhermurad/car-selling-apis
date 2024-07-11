import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepo: Repository<Report>,
  ) {}
  // GET ALL REPOSE
  async getAllReports() {
    // SELECT * FROM REPORT 
    // const a= await this.reportRepo.createQueryBuilder("report").where('report.id between 1 and 10').getMany()
    const a =await this.reportRepo.createQueryBuilder().select("*").where("id between :id And 9",{id:2}).getRawMany()

    return await this.reportRepo.find({ relations: { user: true } });
  }

  // CREATE REPOST
  async createReport(report: CreateReportDto, user: User) {
    // we have to save report to database

    const ObjectToIntace = plainToInstance(Report, report);
    ObjectToIntace.user = user;
    const rept = await this.reportRepo.save(ObjectToIntace);
    return rept;
  }

  // UPDATE REPORT
  async updateReport(id: number, isPublish: boolean) {
    const rept = await this.reportRepo.findOne({ where: { id } });
    if (!rept) {
      throw new NotFoundException('No report found for this Id');
    }
    rept.isPublish = isPublish;
    return await this.reportRepo.save(rept);
  }
}

// nowe we have to make the report unApprovid


// what is the system design ?




// SELECT * FROM REPOTT  WHERE ID=1;
// UPDATE REPORT SET IS_PUBLISH=1 WHERE ID=1;
// SELECT * FROM REPORT WHERE ID=1;
// 
// SELECT * FROM REPORT WHERE ID=1;

// SELECT COUNT 

// where used with
// equal
// not equal
// greater 
// less
// between
// and or etc
//