import nodemailer from "nodemailer";

import { ENV_VARS } from "../constants/index.js";
import { env } from "../utils/env.js";

const transporter = nodemailer.createTransport({
  host: env(ENV_VARS.SMTP_HOST),
  port: Number(env(ENV_VARS.SMTP_PORT)),
  auth: {
    user: env(ENV_VARS.SMTP_USER),
    pass: env(ENV_VARS.SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
