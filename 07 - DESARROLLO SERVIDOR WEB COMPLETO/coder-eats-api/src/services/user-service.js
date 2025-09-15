import { userRepository } from "../repositories/user-repository.js";
import CustomError from "../utils/custom-error.js";

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  getAll = async () => {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw error;
    }
  };

  addOrderTouser = async (userId, orderId) => {
    try {
      return await this.repository.addOrderToUser(userId, orderId);
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (id) => {
    try {
      const user = await this.repository.getUserById(id);
      if (!user) throw new CustomError("user not found", 404);
      return user;
    } catch (error) {
      throw error;
    }
  };
  create = async (body) => {
    try {
      const user = await this.repository.create(body);
      if (!user) throw new CustomError("error create user", 400);
      return user;
    } catch (error) {
      throw error;
    }
  };

//   update = async () => {
//     try {
//     } catch (error) {
//       throw error;
//     }
//   };

//   delete = async () => {
//     try {
//     } catch (error) {
//       throw error;
//     }
//   };
}

export const userService = new UserService(userRepository);

