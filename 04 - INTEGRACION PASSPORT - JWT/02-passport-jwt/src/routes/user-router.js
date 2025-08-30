import { Router } from "express";
import { userController } from "../controllers/user-controllers.js";
import { passportCall } from "../middlewares/passport/passport-call.js";
import { verifyRole } from "../middlewares/verify-role.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
/* ------------------------------------ - ----------------------------------- */
router.get(
  "/private-headers",
  passportCall("jwt", { session: false }),
  verifyRole('USER'),
  (req, res) => res.json({ user: req.user })
);

router.get(
  "/private-headers-admin",
  passportCall("jwt", { session: false }),
  verifyRole('ADMIN'),
  (req, res) => res.json({ user: req.user })
);

/* ------------------------------------ - ----------------------------------- */

router.get(
  "/private-cookies",
  passportCall("jwtCookies", { session: false }),
  verifyRole('USER'),
  (req, res) => res.json({ user: req.user })
);

router.get(
  "/private-cookies-admin",
  passportCall("jwtCookies", { session: false }),
  verifyRole('ADMIN'),
  (req, res) => res.json({ user: req.user })
);

export default router;
