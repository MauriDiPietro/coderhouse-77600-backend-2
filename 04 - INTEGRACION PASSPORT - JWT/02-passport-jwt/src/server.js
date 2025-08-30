import express from "express";
import passport from 'passport'
import cookieParser from "cookie-parser";
import config from "./config/config.js";
import { errorHandler } from "./middlewares/error-handler.js";
import userRouter from "./routes/user-router.js";
import { initMongoDB } from "./config/db-connection.js";
import './middlewares/passport/passport-jwt-cookies.js'
import './middlewares/passport/passport-jwt-headers.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/users", userRouter);

app.use(errorHandler);

initMongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
);
