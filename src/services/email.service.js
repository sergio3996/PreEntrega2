import nodemailer from "nodemailer";
import config from "../config/config.js";

class EmailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: config.mail.emailService,
      host: "smtp.gmail.com",
      port: config.mail.emailPort,
      auth: {
        user: config.mail.emailUser,
        pass: config.mail.emailPassword,
      },
    });
  }

  sendMail(to, subject, html, attachments = []) {
    return this.transport.sendMail({
      from: config.emailUser,
      to,
      subject,
      html,
      attachments,
    });
  }
}

export default new EmailService();
