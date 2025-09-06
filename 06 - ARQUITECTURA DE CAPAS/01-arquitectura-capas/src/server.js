import express from "express";
import { errorHandler } from "./middlewares/error-handler.js";
import { initMongoDB } from "./config/db-connection.js";
import productRouter from "./routes/product-router.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter)

app.use(errorHandler);

const PERSISTENCE = process.env.PERSISTENCE;

PERSISTENCE === "mongo" &&
  initMongoDB()
    .then(() => console.log("conectado a la db"))
    .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("Server running on port 8080");
});
