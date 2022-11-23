import mongoose from "mongoose";
import logger from "./logger";
import config from "../config/default";

async function connect() {
  const dbUri = config.dbUri as string;

  try {
    await mongoose.connect(dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.error("Could not connect to db");
    process.exit(1);
  }
}

export default connect;
