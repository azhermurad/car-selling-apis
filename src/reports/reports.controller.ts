import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/gards/auth.guard';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/user.entity';
import { Serializer } from 'src/interceptors/serializer.interceptor';
import { ReportDto } from './dtos/report.dto';



@Controller('reports')
@Serializer(ReportDto)
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  @Get()
  async getAllReports() {
    return await this.reportService.getAllReports();
  }
  @Post()
  @UseGuards(AuthGuard)
  async createReport(@Body() body: CreateReportDto,@CurrentUser() user:User) {
console.log(user)
    const report = await this.reportService.createReport(body,user);
    return report;
  }

  @Patch('/:id')
  updateReport() {
    return 'update report';
  }
}

// we have to implement three routes
// get reports
// post reports
// update reports/:id
