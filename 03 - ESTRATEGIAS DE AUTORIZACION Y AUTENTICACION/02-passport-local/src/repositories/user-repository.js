import { userDao } from "../daos/user-dao.js";
import CustomError from "../utils/custom-error.js";
import { createHash, isValidPass } from "../utils/user-utils.js";

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getUserByEmail = async (email) => {
    try {
      return await this.dao.getUserByEmail(email);
    } catch (error) {
      throw new Error(error);
    }
  };

  getUserById = async (id) => {
    try {
      return await this.dao.getById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  register = async (body) => {
    try {
      const { email, password } = body;
      const existUser = await this.getUserByEmail(email);
      if (existUser) throw new CustomError("El usuario ya existe", 400);
      const response = await this.dao.create({
        ...body,
        password: createHash(password),
      });
      if (!response)
        throw new CustomError("Error al registrar al usuario", 400);
      return response;
    } catch (error) {
      throw error;
    }
  };

  login = async (email, password) => {
    try {
      const userExist = await this.getUserByEmail(email);
      if (!userExist) throw new CustomError("Credenciales incorrectas", 400);
      const passValid = isValidPass(password, userExist.password);
      if (!passValid) throw new CustomError("Credenciales incorrectas", 400);
      return userExist;
    } catch (error) {
      throw error;
    }
  };
}

export const userRepository = new UserRepository(userDao);
