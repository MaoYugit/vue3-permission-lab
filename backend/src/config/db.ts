import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vue3-permission-lab";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("▶ [Database] MongoDB 连接成功");
  } catch (error) {
    console.error("▶ [Database] MongoDB 连接失败:", error);
    process.exit(1); // 连接失败则强制退出进程
  }
};
