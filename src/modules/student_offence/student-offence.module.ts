import { Module } from '@nestjs/common';
import { StudentOffenceService } from './student-offence.service';
import { StudentOffenceController } from './student-offence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentOffense } from './entities/student-offence.entity';
import { Student } from '../student/entities/student.entity';


@Module({
  imports: [TypeOrmModule.forFeature([StudentOffense,Student])],
  controllers: [StudentOffenceController],
  providers: [StudentOffenceService],
})
export class StudentOffenceModule {}
