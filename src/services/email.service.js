import nodemailer from "nodemailer";

class EmailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: "smtp.gmail.com",
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  sendMail(to, subject, html, attachments = []) {
    return this.transport.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      attachments,
    });
  }
}

export default new EmailService();
