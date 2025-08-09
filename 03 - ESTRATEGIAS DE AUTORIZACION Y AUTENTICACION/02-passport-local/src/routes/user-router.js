import { Router } from "express";
import passport from "passport";
import { userController } from "../controllers/user-controllers.js";
import { isAuth } from "../middlewares/is-auth.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register"),
  userController.register
);
router.post("/login", passport.authenticate("login"), userController.login);
router.get("/private", isAuth, (req, res) =>
  res.send("ruta privada para usuarios autenticados")
);

export default router;
