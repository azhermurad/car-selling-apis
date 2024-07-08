// now have to wirte the dto for make the report

import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(2000)
  @Max(2030)
  year: number;

  @IsNumber()
  mileage: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;
}
