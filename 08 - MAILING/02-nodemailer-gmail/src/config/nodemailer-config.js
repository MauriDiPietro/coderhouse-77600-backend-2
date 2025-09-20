import { createTransport } from "nodemailer";
import { templateHtml } from "../utils/template.js";
import hbs from 'nodemailer-express-handlebars'

export const transporter = createTransport({
  // host: process.env.HOST,
  service: 'gmail',
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
    attachments: [
      {
        path: `${process.cwd()}/src/utils/hola.txt`,
        filename: "coderhouse.txt",
      }
    ]
  };
};

const hbsConfig = {
  viewEngine: {
    extName: '.handlebars',
    defaultLayout: false,
  },
  viewPath: `${process.cwd()}/src/views`,
  extName: '.handlebars',
}


export const emailConfigHbs = (name, dest) => {
  transporter.use('compile', hbs(hbsConfig))
  return {
    from: process.env.USER,
    to: dest,
    subject: "Bienvenida",
    template: 'email',
    context: {
      title: `¡Hola ${name}!, Bienvenido/a a Coderhouse`,
      text: 'El curso de backend comienza el 25/09/2025.....'
    },
    attachments: [
      {
        path: `${process.cwd()}/src/utils/hola.txt`,
        filename: "coderhouse.txt",
      }
    ]
  };
};