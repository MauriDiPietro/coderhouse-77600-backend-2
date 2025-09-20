import { businessService } from "../services/business-service.js";

class BusinessController {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const business = await this.service.getAll();
      res.status(200).json(business);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const business = await this.service.getById(id);
      res.status(200).json(business);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const body = req.body;
      const business = await this.service.create(body);
      res.status(201).json(business);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const business = await this.service.update(id, body);
      res.status(200).json(business);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const business = await this.service.delete(id);
      res.status(200).json(business);
    } catch (error) {
      next(error);
    }
  };
}

export const businessController = new BusinessController(businessService);
