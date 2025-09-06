import { connect } from "mongoose";

export const initMongoDB = async () => {
  await connect(process.env.MONGO_URL);
};
