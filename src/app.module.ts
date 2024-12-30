import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';

import { AuthModule } from './modules/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { StudentModule } from './modules/student/student.module';
import { SectionModule } from './modules/section/section.module';
import { GradeModule } from './modules/grade/grade.module';
import { OffenceModule } from './modules/offence/offence.module';
import { StudentOffenceModule } from './modules/student_offence/student-offence.module';
import { PingModule } from './modules/ping/ping.module';
import { MailerModule } from './modules/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    DatabaseModule,
    AuthModule,
    StudentModule,
    SectionModule,
    GradeModule,
    OffenceModule,
    StudentOffenceModule,
    PingModule,
    MailerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
      scope: Scope.REQUEST,
    },
  ],
})
export class AppModule {}
