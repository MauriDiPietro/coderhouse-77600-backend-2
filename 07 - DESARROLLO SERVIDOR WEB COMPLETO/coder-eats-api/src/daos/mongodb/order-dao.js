import MongoDao from "./mongo-dao.js";
import { OrderModel } from "./models/order-model.js";

class OrderDao extends MongoDao {
  constructor(model) {
    super(model);
  }

  getOrderById = async (id) => {
    try {
      return await this.model.findById(id).populate("usuario negocio");
    } catch (error) {
      throw new Error(error);
    }
  };

  getAllOrders = async () => {
    try {
      return await this.model.find().populate("usuario negocio");
    } catch (error) {
      throw new Error(error);
    }
  };
}

export const orderDao = new OrderDao(OrderModel);
