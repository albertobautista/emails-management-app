import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './mail.interface';
import Mail from 'nodemailer/lib/mailer';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';
@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}
  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: 587,
      secure: false, // `true` for port 465, `false` for all other ports
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
    console.log('transporter', transporter);
    return transporter;
  }

  async sendMail(dto: SendEmailDto) {
    const { from, recipients, subject, html, placeholderReplacement } = dto;
    const transport = this.mailTransport();

    const options: Mail.Options = {
      from: from ?? {
        name: this.configService.get('APP_NAME'),
        address: this.configService.get('DEFAULT_EMAIL_FROM'),
      },
      // to: recipients,
      subject,
      html,
      bcc: recipients,
    };
    console.log('options', options);
    try {
      const result = await transport.sendMail(options);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async parseCsv(filePath: string): Promise<any[]> {
    const results = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }
}
