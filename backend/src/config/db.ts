import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import { User } from "../models/User.js"; // 导入用户模型

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vue3-permission-lab";

// 自动生成初始测试用户
const seedInitialUsers = async (): Promise<void> => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log("▶ [Database] 检测到用户表为空，正在生成测试数据...");

      const defaultUsers = [
        {
          username: "admin",
          password: "admin123",
          role: "admin",
          phone: "13811112222",
        },
        {
          username: "editor",
          password: "editor123",
          role: "editor",
          phone: "13933334444",
        },
        {
          username: "viewer",
          password: "viewer123",
          role: "viewer",
          phone: "18855556666",
        },
      ] as const;

      for (const item of defaultUsers) {
        // 哈希密码，盐值强度为 10
        const hashedPassword = await bcryptjs.hash(item.password, 10);
        await User.create({
          username: item.username,
          password: hashedPassword,
          role: item.role,
          phone: item.phone,
        });
        console.log(
          `  - 账号创建成功: [${item.role}] ${item.username} / ${item.password}`,
        );
      }
      console.log("▶ [Database] 测试数据生成完毕。");
    }
  } catch (error) {
    console.error("▶ [Database] 预置测试数据失败:", error);
  }
};

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("▶ [Database] MongoDB 连接成功");
    // 成功连接后运行 Seeder 脚本
    await seedInitialUsers();
  } catch (error) {
    console.error("▶ [Database] MongoDB 连接失败:", error);
    process.exit(1);
  }
};
