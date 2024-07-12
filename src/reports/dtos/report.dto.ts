// now have to wirte the dto for make the report

import { Expose, Type, Transform } from 'class-transformer';
import { UserDto } from '../../users/dto/userr.dto';
UserDto
export class ReportDto {
  @Expose()
  price: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  mileage: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  isPublish: boolean;

  @Transform(({ obj }) => (obj?.user ? obj.user.id : null))
  @Expose()
  userId: any;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
