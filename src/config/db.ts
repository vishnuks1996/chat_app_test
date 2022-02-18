import mongoose from "mongoose";
import config from "config";
import logger from "./";

function connect() {
  const host = config.get("mongo.host") as string;
  const port = config.get("mongo.port") as number;
  const dbName = config.get("mongo.dbName") as string;
  const dbUri = `mongodb://${host}:${port}/${dbName}`;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
    };

  return mongoose
    .connect(dbUri, options)
    .then(() => {
      logger.info("Database connected");
    })
    .catch((error) => {
      logger.error("db error", error);
      process.exit(1);
    });
}

export default connect;
