import app from "./app.js"; // 注意：在 ESM 规范下，TS 文件引入必须带有 .js 后缀
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // 1. 先建立数据库连接
  await connectDB();

  // 2. 监听端口
  app.listen(PORT, () => {
    console.log(
      `▶ [Server] Express 服务已启动，监听端口: http://localhost:${PORT}`,
    );
  });
};

startServer();
