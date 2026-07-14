import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { ElMessage } from "element-plus";
import { useAuthStore } from "@/stores/auth.js";
import router from "@/router/index.js";

const service: AxiosInstance = axios.create({
  baseURL: "/api", // 结合 Vite Proxy 将请求转发至后端 http://localhost:3000/api
  timeout: 10000,
});

// 1. 请求拦截器 (Request Interceptor)
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore();
    // 如果本地存在凭证，在 Headers 中自动注入 Bearer Token
    if (authStore.token && config.headers) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 2. 响应拦截器 (Response Interceptor)
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // 拦截业务状态码而非 HTTP 状态码（根据 05 号文档契约定义，统一在 200 通道中通过 code 字段区分业务结果）
    if (res.code !== 200) {
      ElMessage.error(res.message || "系统响应异常");
      return Promise.reject(new Error(res.message || "Error"));
    }
    return res;
  },
  (error) => {
    const authStore = useAuthStore();

    // 拦截 HTTP 级别的异常
    if (error.response) {
      switch (error.response.status) {
        case 401: // 未认证 / 凭证失效
          ElMessage.error("登录凭证已过期，请重新登录");
          authStore.logout(); // 清除本地缓存的无效状态
          router.push("/login"); // 重定向至登录页
          break;
        case 403: // 权限不足
          ElMessage.error("暂无操作权限");
          router.push("/403");
          break;
        default:
          ElMessage.error(error.response.data?.message || "服务器运行异常");
      }
    } else {
      ElMessage.error("网络连接超时或服务器无响应");
    }
    return Promise.reject(error);
  },
);

export default service;
