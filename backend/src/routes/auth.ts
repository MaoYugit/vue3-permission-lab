import { Router, Request, Response, RequestHandler } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { LoginRequest, LoginResponseData } from "../types/auth.js";
import { ApiResponse } from "../types/response.js";

const router = Router();

/**
 * 用户登录接口
 * POST /api/auth/login
 */
const loginHandler: RequestHandler = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response<ApiResponse<LoginResponseData | null>>,
): Promise<void> => {
  try {
    const { username, password } = req.body;

    // 1. 验证基础参数
    if (!username || !password) {
      res.status(200).json({
        code: 400,
        message: "用户名和密码不能为空",
        data: null,
      });
      return;
    }

    // 2. 查询用户（因 password 设为了 select: false，需显式使用 +password 提出来）
    const user = await User.findOne({ username }).select("+password");
    if (!user || !user.password) {
      res.status(200).json({
        code: 400,
        message: "用户名或密码错误",
        data: null,
      });
      return;
    }

    // 3. 校验密码
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(200).json({
        code: 400,
        message: "用户名或密码错误",
        data: null,
      });
      return;
    }

    // 4. 生成 JWT 载荷（仅存放最小必要数据，防止载荷体积过大或泄露敏感信息）
    const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: "24h" }, // 凭证 24 小时有效
    );

    // 5. 返回标准结构数据
    res.status(200).json({
      code: 200,
      message: "登录成功",
      data: {
        token,
        user: {
          id: user._id.toString(),
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("▶ [Server] Login Error:", error);
    res.status(200).json({
      code: 500,
      message: "服务器内部错误，请稍后再试",
      data: null,
    });
  }
};

router.post("/login", loginHandler);

export default router;
