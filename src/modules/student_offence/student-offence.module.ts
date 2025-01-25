import { Module } from '@nestjs/common';
import { StudentOffenceService } from './student-offence.service';
import { StudentOffenceController } from './student-offence.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentOffense } from './entities/student-offence.entity';
import { Student } from '../student/entities/student.entity';
import { MailerModule } from '../mailer/mailer.module';
import { StudentOffenceScheduler } from './student-offence.scheduler';


@Module({
  imports: [TypeOrmModule.forFeature([StudentOffense,Student]),MailerModule],
  controllers: [StudentOffenceController],
  providers: [StudentOffenceService,StudentOffenceScheduler],
})
export class StudentOffenceModule {}
