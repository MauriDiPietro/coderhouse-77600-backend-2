import { Router } from "express";
import ProductDaoFS from "../daos/filesystem/product-dao.js";
import ProductMongoDao from "../daos/mongo/product-dao.js";
import ProductRepository from "../repositories/product-repository.js";
import ProductService from "../services/product-service.js";
import ProductController from "../controllers/product-controller.js";

const router = Router();

const dao =
  process.env.PERSISTENCE === "mongo"
    ? new ProductMongoDao()
    : new ProductDaoFS();

const repository = new ProductRepository(dao);
const service = new ProductService(repository);
const controller = new ProductController(service);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
