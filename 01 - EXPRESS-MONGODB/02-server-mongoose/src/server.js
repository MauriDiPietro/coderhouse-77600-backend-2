import express from "express";
import config from "./config/config.js";
import { errorHandler } from "./middlewares/error-handler.js";
import productRouter from "./routes/product-router.js";
import { initMongoDB } from "./config/db-connection.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);

app.use(errorHandler);

initMongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
);
