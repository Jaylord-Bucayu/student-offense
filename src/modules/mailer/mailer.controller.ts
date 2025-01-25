import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendMail(@Body() body: { to: string; subject: string; text: string; html?: string }) {
    const { to, subject, text, html } = body;

    try {
      await this.mailerService.sendMail(to, subject, text, html);
      return { message: 'Email sent successfully!' };
    } catch (error) {
      return { message: 'Failed to send email', error: error.message };
    }
  }
}
