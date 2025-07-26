import { productDao } from "../daos/product-dao.js";
import CustomError from "../utils/custom-error.js";

class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      return await this.dao.getAll();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const product = await this.dao.getById(id);
      if (!product) throw new CustomError("Product not found", 404);
      return product;
    } catch (error) {
      throw error;
    }
  };

  create = async (body) => {
    try {
      const product = await this.dao.create(body);
      if (!product) throw new CustomError("Product creation failed", 400);
      return product;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, body) => {
    try {
      const product = await this.dao.update(id, body);
      if (!product) throw new CustomError("Product not found for update", 404);
      return product;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const product = await this.dao.delete(id);
      if (!product)
        throw new CustomError("Product not found for deletion", 404);
      return product;
    } catch (error) {
      throw error;
    }
  };
}

export const productRepository = new ProductRepository(productDao);
