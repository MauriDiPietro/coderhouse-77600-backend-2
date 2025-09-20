import express from "express";
import morgan from "morgan";
import cors from "cors";
import { initMongoDB } from "./config/db-connection.js";
import userRouter from './routes/user-router.js'
import businessRouter from './routes/business-router.js'
import orderRouter from './routes/order-router.js'

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONT_URL }))

app.use('/users', userRouter)
app.use('/business', businessRouter)
app.use('/orders', orderRouter)

initMongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(8080, () => console.log("server ok, puerto 8080"));
