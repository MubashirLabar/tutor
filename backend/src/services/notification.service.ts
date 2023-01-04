import * as nodemailer from 'nodemailer';
import * as path from 'path';
import env from '../config/env.config.manager';
import * as ejs from 'ejs';
import { Twilio } from 'twilio';
// const client = require('twilio')(accountSid, authToken);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.getEnvValue('USERNAME'),
    pass: env.getEnvValue('PASSWORD')
  }
});

const templatePath = path.join(__dirname, '../templates');

export const sendMessage = async (to: string, body: string) => {
  const accountSid = env.getEnvValue('TWILIO_ACCOUNT_SID');
  console.log('accountSid = ', accountSid);
  const authToken = env.getEnvValue('TWILIO_AUTH_TOKEN');
  const from = env.getEnvValue('FROM');
  console.log('from = ', from);
  const client = new Twilio(accountSid, authToken);
  const message = await client.messages.create({ body, from, to });
  // console.log('message = ', message);
  return message;
};

export const sendEmail = async (
  to: string,
  subject: string,
  template: string,
  data: unknown
) => {
  try {
    const html = await ejs.renderFile(`${templatePath}/${template}.ejs`, data, {
      async: true
    });
    const email = {
      from: env.getEnvValue('EMAIL_FROM'),
      to,
      subject,
      html
    };
    const emailSent = await transporter.sendMail(email);
    return emailSent;
  } catch (error) {
    console.log('Sending email failed.');
    console.log(error);
    return error;
  }
};
