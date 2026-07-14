import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth.js"; // 导入认证路由

const app: Application = express();

// 安全与基础中间件
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // 允许前端 Vue3 项目进行跨域通信
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 注册路由模块
app.use("/api/auth", authRouter);

// 健康检查接口
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

export default app;
