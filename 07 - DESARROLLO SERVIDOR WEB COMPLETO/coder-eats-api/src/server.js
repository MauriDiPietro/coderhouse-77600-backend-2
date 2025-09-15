import express from "express";
import morgan from "morgan";
import { initMongoDB } from "./config/db-connection";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initMongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(8080, () => console.log("server ok, puerto 8080"));
