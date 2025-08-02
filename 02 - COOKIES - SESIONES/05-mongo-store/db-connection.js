import "dotenv/config";
import { connect } from "mongoose";

export const initMongoDB = async () => {
  try {
    await connect(process.env.MONGO_URL);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
