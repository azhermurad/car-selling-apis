// now have to wirte the dto for make the report

import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dto/userr.dto';

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
  @Type(() => UserDto)
  user: UserDto;
}




