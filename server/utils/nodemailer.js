import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const options = {
  service: 'gmail',
  secure: false,
  port: Number(process.env.NODEMAILER_PORT) || 25,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  tls: { rejectUnauthorized: false },
};

export const mailer = nodemailer.createTransport(options);
