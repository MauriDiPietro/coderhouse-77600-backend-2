import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

const num = "549357154****@c.us";

client.on("ready", async () => {
  console.log("Client is ready!");
  const message = "Hola este es un mensaje automatico";
  await client.sendMessage(num, message);
});

client.on("message", async (msg) => {
  const userMessage = msg.body.toLocaleLowerCase().trim();

  switch (userMessage) {
    case "prueba":
      await client.sendMessage(
        msg.from,
        "Hola soy un bot de whatsapp. ¿como puedo ayudarte? \n\nEscribe *info*, *precio*, *contacto*"
      );
      break;
    case "info":
      await client.sendMessage(
        msg.from,
        "Aquí tienes la información que solicitaste....."
      );
      break;
    case "precio":
      await client.sendMessage(
        msg.from,
        "Esta es la lista de precios: \n -producto 1: $12000"
      );
      break;
    case "contacto":
      await client.sendMessage(
        msg.from,
        "podes contactarnos a este telefono....."
      );
      break;
    case "chau":
    case "adios":
      await client.sendMessage(msg.from, "¡Hasta luego!");
      break;

    default:
      await client.sendMessage(
        msg.from,
        "Lo siento, no entendí tu mensaje. \n\nIntentá con *info*, *precio*, *contacto*"
      );
      break;
  }
});

client.initialize();
