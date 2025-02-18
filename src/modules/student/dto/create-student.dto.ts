import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {

  @IsNotEmpty()
  @IsString()
  student_id: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_initial: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  section_name: string;

  @IsNotEmpty()
  @IsString()
  grade_level: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}
