import { userService } from "../services/user-service.js";

class UserController {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const users = await this.service.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.service.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const body = req.body;
      const user = await this.service.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await this.service.update(id, body);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.service.delete(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userService);
