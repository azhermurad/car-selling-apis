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
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/gards/auth.guard';
import { CurrentUser } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/user.entity';
import { Serializer } from 'src/interceptors/serializer.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approvide-report-dto';

@Controller('reports')
@Serializer(ReportDto)
export class ReportsController {
  constructor(private reportService: ReportsService) {}
  @Get()
  async getAllReports() {
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
  async updateReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
    console.log(typeof id);
    return await this.reportService.updateReport(id,body.isPublish);
  }
}

// we have to implement three routes
// get reports
// post reports
// update reports/:id
