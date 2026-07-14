import { Schema, model, Document } from "mongoose";

// 1. 定义 TypeScript 接口描述 User 文档
export interface IUser extends Document {
  username: string;
  password?: string; // 可选，因为 select 为 false 时普通查询不返回此字段
  role: "admin" | "editor" | "viewer";
  phone: string; // 敏感字段，后续进行脱敏开发
}

// 2. 创建 Mongoose Schema
const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "用户名不能为空"],
      unique: true,
      trim: true,
      minlength: [3, "用户名长度至少为 3 位"],
      maxlength: [20, "用户名长度最多为 20 位"],
    },
    password: {
      type: String,
      required: [true, "密码不能为空"],
      select: false, // 在普通查询中默认不返回密码字段，提高安全性
    },
    role: {
      type: String,
      enum: ["admin", "editor", "viewer"],
      default: "viewer",
    },
    phone: {
      type: String,
      required: [true, "手机号不能为空"],
      trim: true,
    },
  },
  {
    timestamps: true, // 自动生成 createdAt 和 updatedAt
    versionKey: false, // 移除 Mongoose 自动生成的 __v 字段
  },
);

export const User = model<IUser>("User", UserSchema);
