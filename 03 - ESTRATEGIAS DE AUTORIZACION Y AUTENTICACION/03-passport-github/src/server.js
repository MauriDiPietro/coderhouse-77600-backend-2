import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import passport from "passport";
import './middlewares/passport/passport-github.js'
import config from "./config/config.js";
import { errorHandler } from "./middlewares/error-handler.js";
import userRouter from "./routes/user-router.js";
import { initMongoDB } from "./config/db-connection.js";

const app = express();

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_URL,
    ttl: 60,
    crypto: {
      secret: config.SECRET_KEY,
    },
  }),
  secret: config.SECRET_KEY,
  cookie: {
    maxAge: 60000,
    httpOnly: true,
  },
  saveUninitialized: true,
  resave: false,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.SECRET_KEY));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.use("/users", userRouter);

app.use(errorHandler);

initMongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.listen(config.PORT, () =>
  console.log(`Server running on port ${config.PORT}`)
);
