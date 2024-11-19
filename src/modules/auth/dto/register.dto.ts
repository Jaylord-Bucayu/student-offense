import { IsEmail, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value || '')
  middlename?: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value || 'USER')
  role?: string;
}
