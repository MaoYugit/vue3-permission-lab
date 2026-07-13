/**
 * 统一 API 响应结构
 */
export interface ApiResponse<T = any> {
  code: number; // 业务状态码（例如：200 为成功，401 为未认证，403 为无权操作等）
  message: string; // 响应消息（用于前端展示或调试说明）
  data: T; // 具体业务数据载荷
}

/**
 * 登录请求载荷
 */
export interface LoginRequest {
  username: string; // 长度校验逻辑需在后端及前端表单实现（建议 3-20 位字符）
  password: string; // 明文密码，由后端使用 bcryptjs 进行哈希比对
}

/**
 * 登录成功后的用户简要信息
 */
export interface LoginUserInfo {
  id: string; // 用户唯一 ID（对应 MongoDB 中的 _id）
  username: string; // 用户名
  role: string; // 角色标识（如 'admin', 'editor', 'viewer'）
}

/**
 * 登录成功返回的实际数据结构
 */
export interface LoginResponseData {
  token: string; // 颁发的 JWT 凭证（前端后续请求需在 Headers 的 Authorization 中携带）
  user: LoginUserInfo; // 登录用户的基本信息，用于前端状态初始化与持久化
}
