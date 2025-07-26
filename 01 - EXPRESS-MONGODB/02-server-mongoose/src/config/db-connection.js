import { connect } from "mongoose";
import config from "./config.js";

export const initMongoDB = async () => {
  await connect(config.MONGO_URL);
};
