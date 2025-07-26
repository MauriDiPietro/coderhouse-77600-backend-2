import { productRepository } from "../repositories/product-repository.js";

class ProductController {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = async (req, res, next) => {
    try {
      const products = await this.repository.getAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.repository.getById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const body = req.body;
      const product = await this.repository.create(body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await this.repository.update(id, body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.repository.delete(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  };
}

export const productController = new ProductController(productRepository);
