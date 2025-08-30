import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const verifyToken = (req, res, next) => {
  // const authHeader = req.headers['authorization'];
  const token = req.get("Authorization")?.split(' ')[1] || req.cookies?.token;
  // Bearer <token>
  if (!token) return res.status(401).json({ msg: "No token provided" });
  try {
    const userDecoded = jwt.verify(token, config.JWT_SECRET);
    req.user = userDecoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};
