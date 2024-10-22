import { Expose, Type } from 'class-transformer';
import { ReportDto } from '../../reports/dtos/report.dto';

export class UserDto {
  @Expose() id: number;
  @Expose() email: string;
  
  @Expose()
  @Type(() => ReportDto)
  reports: ReportDto[];

}
