import { emailConfig, emailConfigHbs, transporter } from "../config/nodemailer-config.js";

export const sendEmailService = async (name, dest) => {
  try {
    return await transporter.sendMail(emailConfig(name, dest));
  } catch (error) {
    throw new Error(error);
  }
};

export const sendEmailServiceHBS = async (name, dest) => {
  try {
    return await transporter.sendMail(emailConfigHbs(name, dest));
  } catch (error) {
    throw new Error(error);
  }
};