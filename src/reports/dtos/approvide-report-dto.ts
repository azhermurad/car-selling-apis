// now have to wirte the dto for make the report

import { IsBoolean } from 'class-validator';

export class ApproveReportDto {
  @IsBoolean()
  isPublish: boolean
}
