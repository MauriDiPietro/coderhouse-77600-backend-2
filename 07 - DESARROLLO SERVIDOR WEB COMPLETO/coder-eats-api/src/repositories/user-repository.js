import BaseRepository from "./base-repository.js";
import { userDao } from "../daos/mongodb/user-dao.js";

class UserRepository extends BaseRepository {
  constructor(dao) {
    super(dao);
  }

  getUserById = async (id) => {
    try {
      return await this.dao.getUserById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  addOrderToUser = async (userId, orderId) => {
    try {
      return await this.dao.update(userId, { $push: { pedidos: orderId } });
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const userRepository = new UserRepository(userDao);
