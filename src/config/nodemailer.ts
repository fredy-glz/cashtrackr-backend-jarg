import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

type TransportConfig = {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
};

const config = (): TransportConfig => {
  return {
    host: process.env.EMAIL_HOST,
    port: +process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };
};

// Looking to send emails in production? Check out our Email API/SMTP product!
export const transport = nodemailer.createTransport(config());
