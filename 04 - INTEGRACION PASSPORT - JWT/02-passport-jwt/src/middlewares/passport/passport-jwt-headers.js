import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "../../config/config.js";

const strategyConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

//req.user = jwt_payload
const verifyToken = async (jwt_payload, done) => {
  if (!jwt_payload) return done(null, false, { messages: "User not found" });
  return done(null, jwt_payload);
};

passport.use("jwt", new Strategy(strategyConfig, verifyToken));
