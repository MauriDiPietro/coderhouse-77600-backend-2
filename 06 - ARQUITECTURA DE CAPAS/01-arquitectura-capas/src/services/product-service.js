import { ProductResponseDTO } from "../dtos/product-res-dto.js";
import { productRepository } from "../repositories/product-repository.js";
import CustomError from "../utils/custom-error.js";

class ProductService {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = async () => {
    try {
      const products = await this.repository.getAll();
      return products.map((p) => new ProductResponseDTO(p))
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const product = await this.repository.getById(id);
      if (!product) throw new CustomError("Product not found", 404);
      return new ProductResponseDTO(product);
    } catch (error) {
      throw error;
    }
  };

  create = async (body) => {
    try {
      const product = await this.repository.create(body);
      if (!product) throw new CustomError("Product creation failed", 400);
      return product;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, body) => {
    try {
      const product = await this.repository.update(id, body);
      if (!product) throw new CustomError("Product not found for update", 404);
      return product;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const product = await this.repository.delete(id);
      if (!product)
        throw new CustomError("Product not found for deletion", 404);
      return product;
    } catch (error) {
      throw error;
    }
  };
}

export const productService = new ProductService(productRepository);