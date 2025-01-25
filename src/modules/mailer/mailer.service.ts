import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // Specify Gmail as the service
      auth: {
        user: this.configService.get<string>('SMTP_USER'), // Gmail email
        pass: this.configService.get<string>('SMTP_PASS'), // App password
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
    const from = this.configService.get<string>('SMTP_FROM');
    const mailOptions = {
      from,
      to,
      subject,
      text,
      html, // Optional
    };

    await this.transporter.sendMail(mailOptions);
  }
}
