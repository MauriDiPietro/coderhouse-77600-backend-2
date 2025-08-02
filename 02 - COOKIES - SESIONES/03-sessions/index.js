// npm i express cookie-parser dotenv

import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import "dotenv/config";

const app = express();

const SECRET_KEY = process.env.SECRET_KEY;

const sessionConfig = {
  secret: SECRET_KEY,
  cookie: {
    maxAge: 60000,
    httpOnly: true,
  },
  saveUninitialized: true,
  resave: false,
};

app.use(session(sessionConfig));

app.use(cookieParser(SECRET_KEY));
app.use(express.json());

const users = [
  { username: "Jose", password: "1234", admin: true },
  { username: "Juan", password: "1234", admin: false },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const index = users.findIndex(
    (user) => user.username === username && user.password === password
  );
  if (index < 0) res.status(401).send("Invalid credentials");
  const user = users[index];
  req.session.info = {
    loggedIn: true,
    count: 1,
    admin: user.admin,
  };
  res.json({ msg: "Bienvenido/a!" });
});

const validateLogin = (req, res, next) => {
  if (req.session.info && req.session.info.loggedIn) {
    next();
  } else
  res.status(401).send("Unauthorized");
};

const isAdmin = (req, res, next) => {
  if (req.session.info && req.session.info.admin) {
    next();
  } else
  res.status(403).send("Forbidden");
};

app.get("/secret-endpoint", validateLogin, (req, res) => {
  req.session.info.count++;
  res.json({
    msg: 'informacion secreta',
    contador: req.session.info.count,
    session: req.session,
  })
});

app.get("/secret-endpoint-admin", validateLogin, isAdmin, (req, res) => {
  req.session.info.count++;
  res.json({
    msg: 'informacion secreta para ADMIN',
    contador: req.session.info.count,
    session: req.session,
  })
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
