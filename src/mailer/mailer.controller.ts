import { Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mail.interface';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
  @Post('send-mail')
  async sendMail() {
    const dto: SendEmailDto = {
      from: {
        name: 'Sociales Club Valle Real',
        address: 'sociales@clubvallereal.com',
      },
      recipients: [{ name: 'Daniel', address: 'dachb_10@hotmail.com' }],
      subject: 'Test email',
      html: '<h1>Hello</h1>',
    };
    console.log('dto', dto);
    return await this.mailerService.sendMail(dto);
  }
}
