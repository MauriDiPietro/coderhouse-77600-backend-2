import { userRepository } from "../repositories/user-repository.js";

class UserController {
  constructor(repository) {
    this.repository = repository;
  }

  register = async (req, res, next) => {
    try {
      res.json({
        msg: "Register ok",
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      res.json({
        msg: "Login OK",
        session: req.session,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController(userRepository);
