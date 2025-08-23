import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/user-controllers.js";
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
  passportCall("github", { scope: ["user: email"] }),
  userController.registerResponse
);

router.get("/private", isAuth, (req, res) =>
  res.send("ruta privada para usuarios autenticados")
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("logout ok");
});

export default router;
