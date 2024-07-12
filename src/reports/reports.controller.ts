import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportDto } from './dtos/report.dto';
import { AdminGuard } from '../gards/admin.guard';
import { ApproveReportDto } from './dtos/approvide-report-dto';
import { User } from '../users/user.entity';
import { AuthGuard } from '../gards/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { CurrentUser } from '../users/decorators/user.decorator';
import { Serializer } from '../interceptors/serializer.interceptor';


@Controller('reports')
@Serializer(ReportDto)
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  @Get()
  
  async getAllReports()  {
    // throw new NotFoundException("not found report")
    return await this.reportService.getAllReports();
  }
  @Post()
  @UseGuards(AuthGuard)
  async createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    console.log(user);

    const report = await this.reportService.createReport(body, user);
    return report;
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  async updateReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
    console.log(typeof id);
    return await this.reportService.updateReport(id,body.isPublish);
  }
}

// we have to implement three routes
// get reports
// post reports
// update reports/:id
