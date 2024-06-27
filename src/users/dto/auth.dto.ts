import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;
 
  @IsNotEmpty()
  password: string;

  @IsNumber()
  age: number;
}
