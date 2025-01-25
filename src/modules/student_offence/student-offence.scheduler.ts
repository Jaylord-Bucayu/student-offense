import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DateTime } from 'luxon';
import { StudentOffenceService } from './student-offence.service';
import { MailerService } from '../mailer/mailer.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class StudentOffenceScheduler {
  private readonly logger = new Logger(StudentOffenceScheduler.name);

  constructor(
    private readonly studentOffenceService: StudentOffenceService,
    private readonly mailerService: MailerService,
  ) {}

  // @Cron(CronExpression.EVERY_MINUTE)
  // async checkAndSendEmailReminders() {
  //   this.logger.log('Checking for offenses due for email reminders.');

  //   const now = DateTime.now();
  //   const today = now.startOf('day'); // Get the start of the current day

  //   // Fetch all offenses with "pending" status
  //   const offenses = await this.studentOffenceService.findPendingOffenses();

  //   for (const offense of offenses) {
  //       const offenseDate = DateTime.fromISO(offense.date_of_service.toISOString()).startOf('day');
  //       const today = DateTime.now().startOf('day');

  //     // Check if the offense date matches today
  //     if (!offenseDate.equals(today)) {
  //       continue; // Skip offenses that are not scheduled for today
  //     }

  //     // Combine date_of_service and service_time into a single DateTime object
  //     const serviceDateTime = DateTime.fromISO(offense.date_of_service.toISOString()).set({
  //       hour: Number(offense.service_time.split(':')[0]),
  //       minute: Number(offense.service_time.split(':')[1]),
  //     });

  //     const diffInMinutes = serviceDateTime.diff(now, 'minutes').toObject().minutes;

  //     if (diffInMinutes !== undefined && diffInMinutes <= 5 && diffInMinutes > 0) {
  //       this.logger.log(`Sending email reminder for offense: ${offense.offense_name}`);

  //       await this.mailerService.sendMail(
  //         offense.student_name,
  //         `Reminder: ${offense.offense_name} Service`,
  //         `Hello ${offense.student_name}, 
  //         this is a reminder for your service scheduled at ${offense.service_time} in ${offense.location}.`
  //       );

  //       // Update offense status to "notified"
  //       offense.status = 'notified';
  //       //@ts-ignore 
  //       await this.studentOffenceService.update(offense._id, { status: 'notified' });
  //     }
  //   }
  // }
}
