import { Router } from "express";
import passport from "passport";
import { isAuth } from "../middlewares/is-auth.js";
import { passportCall } from "../middlewares/passport/passport-call.js";

const router = Router();

//! --> | REGISTRARSE CON GITHUB |
router.get(
  "/register-github",
  passportCall("github", { scope: ["user: email"] })
);

router.get(
  "/profile-github",
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/profile",
    passReqToCallback: true,
  })
);

router.get("/private", isAuth, (req, res) =>
  res.send("ruta privada para usuarios autenticados")
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("logout ok");
});

export default router;
