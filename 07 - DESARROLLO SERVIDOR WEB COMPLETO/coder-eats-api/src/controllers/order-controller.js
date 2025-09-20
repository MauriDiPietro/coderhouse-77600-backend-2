import { orderService } from "../services/order-service.js";

class OrderController {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const orders = await this.service.getAll();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await this.service.getById(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const body = req.body;
      const order = await this.service.create(body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await this.service.update(id, body);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await this.service.delete(id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  };
}

export const orderController = new OrderController(orderService);
