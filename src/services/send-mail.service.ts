import nodemailer from "nodemailer";

export class SendMailService {
  private transpoter;
  constructor() {
    this.transpoter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  public async sendEmail(
    to: string,
    subject: string,
    html: string
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: "",
      html,
    };

    await this.transpoter.sendMail(mailOptions);
  }
}
