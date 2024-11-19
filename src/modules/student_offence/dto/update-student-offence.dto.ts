import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentOffenceDto } from './create-student-offence.dto';

export class UpdateStudentOffenceDto extends PartialType(CreateStudentOffenceDto) {}
