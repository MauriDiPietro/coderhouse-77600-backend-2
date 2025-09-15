import BaseRepository from "./base-repository.js";
import { orderDao } from "../daos/mongodb/order-dao.js";

class OrderRepository extends BaseRepository {
  constructor(dao) {
    super(dao);
  }

  getOrderById = async (id) => {
    try {
      return await this.dao.getOrderById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  getAllOrders = async () => {
    try {
      return await this.dao.getAllOrders();
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const orderRepository = new OrderRepository(orderDao);
