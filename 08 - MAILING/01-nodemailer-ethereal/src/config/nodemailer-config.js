import { createTransport } from "nodemailer";
import { templateHtml } from "../utils/template.js";

export const transporter = createTransport({
  host: process.env.HOST,
  port: process.env.PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

export const emailConfig = (name, dest) => {
  return {
    from: process.env.USER,
    to: dest,
    subject: "Bienvenida",
    // text: "¡Bienvenido/a a Coderhouse!",
    // html: `<h1>¡Bienvenido/a a Coderhouse!</h1>`
    html: templateHtml(name),
  };
};
