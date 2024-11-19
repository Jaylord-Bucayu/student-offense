import { IsEmail, IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
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

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value || 'LOCAL')
  provider?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value || 'USER')
  role?: string;
}
