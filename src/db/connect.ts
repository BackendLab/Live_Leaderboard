import Redis from "ioredis";
import mongoose from "mongoose";

export const redis = new Redis(Bun.env.REDIS_URL!);

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("error", (err) => {
  console.error("Redis connection failed", err);
});

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${Bun.env.MONGO_URI}/${Bun.env.DB_NAME}`,
    );
    console.log(
      "Database connection established successfully!",
      "Host:",
      connectionInstance.connection.host,
    );
  } catch (error) {
    console.error("Database Connection Failed!", error);
    process.exit(1);
  }
};
