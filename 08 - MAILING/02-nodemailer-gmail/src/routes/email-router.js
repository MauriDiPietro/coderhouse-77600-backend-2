import { Router } from "express";
import { sendEmailController, sendEmailControllerHBS } from "../controllers/email-controller.js";

const router = Router();

router.post("/send", sendEmailController);
router.post("/send-hbs", sendEmailControllerHBS);


export default router;
