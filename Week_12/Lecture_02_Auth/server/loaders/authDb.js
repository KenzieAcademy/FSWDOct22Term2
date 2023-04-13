import mongoose from "mongoose";
import config from "../config";

export default async () => {
  return await mongoose.connect(config.db.auth_db_url);
};
