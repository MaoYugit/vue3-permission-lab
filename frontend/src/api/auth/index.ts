import request from "@/utils/request.js";
import type { ApiResponse } from "@/api/auth/types";
import type { LoginRequest, LoginResponseData } from "./types.js";

/**
 * 用户登录 API
 */
export function loginApi(
  data: LoginRequest,
): Promise<ApiResponse<LoginResponseData>> {
  return request({
    url: "/auth/login",
    method: "POST",
    data,
  }) as unknown as Promise<ApiResponse<LoginResponseData>>;
}
