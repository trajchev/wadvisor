import nodemailer from 'nodemailer';
import pug from 'pug';
import htmlToText from 'html-to-text';
import { IUser } from '../models/interfaces/user.interface';
import { mailTemplates } from '../models/constants/enums';

export default class Email {

  private to: string = '';
  private url: string;
  private from: string;
  private username: string = '';

  constructor(user: IUser, url: string) {
    this.to = user.email;
    this.username = user.username;
    this.url = url;
    this.from = `Win Advisor Team <${process.env.EMAIL_FROM}>`
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'Sendgrid',
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD
      }
    });
  }

  // Send the mail
  async send(template: mailTemplates, subject: string) {

    // Define the html for the email
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      username: this.username,
      url: this.url,
      subject
    });

    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText.fromString(html)
    }

    // Create transport and send mail
    await this.newTransport().sendMail(mailOptions);

  }

}
