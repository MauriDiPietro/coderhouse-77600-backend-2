import { Router } from "express";
import { businessController } from "../controllers/business-controller.js";

const router = Router();

router.get("/", businessController.getAll);
router.get("/:id", businessController.getById);
router.post("/", businessController.create);
router.put("/:id", businessController.update);
router.delete("/:id", businessController.delete);

export default router;
