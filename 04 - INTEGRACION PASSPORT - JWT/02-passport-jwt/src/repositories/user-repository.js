import jwt from "jsonwebtoken";
import { userDao } from "../daos/user-dao.js";
import CustomError from "../utils/custom-error.js";
import { createHash, isValidPass } from "../utils/user-utils.js";
import config from "../config/config.js";

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  register = async (body) => {
    try {
      const { email, password } = body;
      const existUser = await this.dao.getUserByEmail(email);
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
      const userExist = await this.dao.getUserByEmail(email);
      if (!userExist) throw new CustomError("Credenciales incorrectas", 400);
      const passValid = isValidPass(password, userExist.password);
      if (!passValid) throw new CustomError("Credenciales incorrectas", 400);
      return userExist;
    } catch (error) {
      throw error;
    }
  };

  generateToken = (user) => {
    const token = jwt.sign(
      {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
      },
      config.JWT_SECRET,
      { expiresIn: "15m" }
    );
    return token;
  }
}

export const userRepository = new UserRepository(userDao);
