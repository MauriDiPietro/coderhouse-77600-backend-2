import { ProductRequestDTO } from "../dtos/product-req-dto.js";
import { productService } from "../services/product-service.js";

class ProductController {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const products = await this.service.getAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.service.getById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const body = new ProductRequestDTO(req.body)
      const product = await this.service.create(body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await this.service.update(id, body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.service.delete(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };
}

export const productController = new ProductController(productService);
