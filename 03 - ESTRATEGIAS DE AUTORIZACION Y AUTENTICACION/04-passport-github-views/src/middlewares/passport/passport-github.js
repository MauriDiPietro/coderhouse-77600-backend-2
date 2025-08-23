import passport from "passport";
import { Strategy } from "passport-github2";
import { userRepository } from "../../repositories/user-repository.js";
import config from "../../config/config.js";

const strategyConfig = {
  clientID: config.CLIENT_ID_GITHUB,
  clientSecret: config.CLIENT_SECRET_GITHUB,
  callbackURL: "http://localhost:8080/users/profile-github",
};

const registerOrLogin = async (accesToken, refreshToken, profile, done) => {
  // console.log(profile);
  try {
    const email = profile._json.email;
    const first_name = profile._json.name.split(" ")[0];
    const last_name =
      profile._json.name.split(" ").length > 2
        ? `${profile._json.name.split(" ")[1]} ${
            profile._json.name.split(" ")[2]
          }`
        : profile._json.name.split(" ")[1];
    const image = profile._json.avatar_url;
    //['Mauri', 'Di', 'Pietro']
    const user = await userRepository.getUserByEmail(email);
    if (user) return done(null, user);
    const newUser = await userRepository.register({
      first_name,
      last_name,
      email,
      image,
      isGithub: true,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

const registerOrLoginStrategy = new Strategy(strategyConfig, registerOrLogin);

passport.use("github", registerOrLoginStrategy);

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
