import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();

// 安全与基础中间件
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // 预留给 Vue3 前端本地服务的跨域配置
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 基础健康检查接口
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

export default app;
