import { defineStore } from "pinia";
import { ref } from "vue";
import type { LoginUserInfo } from "@/api/auth/types.js";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const token = ref<string | null>(null);
    const userInfo = ref<LoginUserInfo | null>(null);

    const setToken = (newToken: string) => {
      token.value = newToken;
    };

    const setUserInfo = (info: LoginUserInfo) => {
      userInfo.value = info;
    };

    const logout = () => {
      token.value = null;
      userInfo.value = null;
    };

    return {
      token,
      userInfo,
      setToken,
      setUserInfo,
      logout,
    };
  },
  {
    persist: {
      key: "vue3_auth_store", // localStorage 的 key 值
      pick: ["token", "userInfo"], // 仅持久化 token 和用户信息
    },
  },
);
