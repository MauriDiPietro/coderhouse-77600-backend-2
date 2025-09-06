import CustomError from "../utils/custom-error.js";

export default class ProductService {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = async () => {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error(error);
    }
  };

  getById = async (id) => {
    try {
      const product = await this.repository.getById(id);
      if (!product) throw new CustomError("Product not found", 404);
      return product;
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

