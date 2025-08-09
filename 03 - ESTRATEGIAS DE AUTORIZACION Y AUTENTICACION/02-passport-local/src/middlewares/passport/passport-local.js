import passport from "passport";
import { Strategy } from "passport-local";
import { userRepository } from "../../repositories/user-repository.js";

const strategyConfig = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const register = async (req, email, password, done) => {
  try {
    const user = await userRepository.getUserByEmail(email);
    if (user) return done(null, false, { messages: "El usuario ya existe" });
    const newUser = await userRepository.register(req.body);
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

const login = async (req, email, password, done) => {
  try {
    const user = await userRepository.login(email, password);
    if (!user) return done(null, false, { messages: "Error Login" });
    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

const registerStrategy = new Strategy(strategyConfig, register);
const loginStrategy = new Strategy(strategyConfig, login);

passport.use("login", loginStrategy);
passport.use("register", registerStrategy);

//request ---> "session" (req.session) --> passport ---> user (req.session.passport.user)

//user ---> req.session.passport
passport.serializeUser((user, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    return done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userRepository.getUserById(id);
    return done(null, user);
  } catch (error) {
    return done(error);
  }
});
