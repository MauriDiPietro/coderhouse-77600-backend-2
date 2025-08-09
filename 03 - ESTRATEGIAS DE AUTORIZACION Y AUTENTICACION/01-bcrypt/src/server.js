import express from "express";
import config from "./config/config.js";
import { errorHandler } from "./middlewares/error-handler.js";
import userRouter from "./routes/user-router.js";
import { initMongoDB } from "./config/db-connection.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

app.use(errorHandler);

initMongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
);
