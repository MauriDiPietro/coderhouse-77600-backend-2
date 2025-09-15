import { businessRepository } from "../repositories/business-repository.js";
import CustomError from "../utils/custom-error.js";

class BusinessService {
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
      const business = await this.repository.getById(id);
      if (!business) throw new CustomError("business not found", 404);
      return business;
    } catch (error) {
      throw error;
    }
  };

  create = async (body) => {
    try {
      const business = await this.repository.create(body);
      if (!business) throw new CustomError("business creation failed", 400);
      return business;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, body) => {
    try {
      const business = await this.repository.update(id, body);
      if (!business)
        throw new CustomError("business not found for update", 404);
      return business;
    } catch (error) {
      throw error;
    }
  };

  delete = async (id) => {
    try {
      const business = await this.repository.delete(id);
      if (!business)
        throw new CustomError("business not found for deletion", 404);
      return business;
    } catch (error) {
      throw error;
    }
  };
}


export const businessService = new BusinessService(businessRepository);