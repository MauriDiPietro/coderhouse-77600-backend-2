import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { userRepository } from "../repositories/user-repository.js";

export const verifyToken = (req, res, next) => {
  // const authHeader = req.headers['authorization'];
  try {
    const token =
      req.cookies?.accessToken || req.get("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token provided" });

    jwt.verify(token, config.JWT_SECRET, async (error, payload) => {
      if (error && error.name === "TokenExpiredError") {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken)
          return res.status(401).json({ msg: "No Autorizado" });

        const user = await userRepository.getUserByRefreshToken(refreshToken);
        if (!user) return res.status(401).json({ msg: "No Autorizado" });

        jwt.verify(refreshToken, config.JWT_SECRET, (error, decoded) => {
          if (error) return res.status(401).json({ msg: "No Autorizado" });
          const accessToken = userRepository.generateToken(user, "15m");

          res.cookie("accessToken", accessToken, { httpOnly: true });

          req.user = decoded;
          next();
        });
      } else {
        req.user = payload;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
