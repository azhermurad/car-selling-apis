import { IsEmail, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateDto {

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  password: string;
}
