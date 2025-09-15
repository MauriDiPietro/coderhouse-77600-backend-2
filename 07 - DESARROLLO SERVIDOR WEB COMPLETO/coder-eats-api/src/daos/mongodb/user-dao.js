import MongoDao from "./mongo-dao.js";
import { UserModel } from "./models/user-model.js";

class UserDao extends MongoDao {
  constructor(model) {
    super(model);
  }

  getUserById = async(id)=>{
    try {
        return await this.model.findById(id).populate('pedidos')    //pedidos[id --> {OrderSchema}]
    } catch (error) {
        throw new Error(error)
    }
  }

  getByEmail = async(email)=>{
    try {
        return await this.model.findOne({correo: email})
    } catch (error) {
        throw new Error(error)
    }
  }
}

export const userDao = new UserDao(UserModel);