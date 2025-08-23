import { Router } from "express";
import { userController } from "../controllers/user-controllers.js";
import { verifyToken } from "../middlewares/verify-token.js";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get('/private', verifyToken, (req, res)=> res.json({ user: req.user }));

export default router;
