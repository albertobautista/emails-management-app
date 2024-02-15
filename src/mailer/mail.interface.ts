import { Address } from 'nodemailer/lib/mailer';

export type SendEmailDto = {
  from?: Address;
  recipients?: Address[];
  bcc?: string[];
  subject: string;
  html: string;
  text?: string;
  placeholderReplacement?: Record<string, string>;
};
