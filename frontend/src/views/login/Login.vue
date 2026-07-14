<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2>系统登录</h2>
      <el-form :model="loginForm" :rules="rules" ref="formRef" label-position="top">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-button type="primary" :loading="loading" class="login-btn" @click="handleLogin">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { loginApi } from '@/api/auth/index.js';
import { useAuthStore } from '@/stores/auth.js';

const router = useRouter();
const authStore = useAuthStore();

const formRef = ref<FormInstance>();
const loading = ref<boolean>(false);

const loginForm = ref({
  username: '',
  password: ''
});

// 表单输入校验规则
const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
};

const handleLogin = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        const response = await loginApi(loginForm.value);
        if (response.code === 200 && response.data) {
          const { token, user } = response.data;

          // 写入持久化 Store 状态
          authStore.setToken(token);
          authStore.setUserInfo(user);

          ElMessage.success('登录成功');
          router.push('/');
        }
      } catch (error) {
        console.error('登录失败：', error);
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;

  .login-card {
    width: 400px;

    h2 {
      text-align: center;
      margin-bottom: 24px;
      color: #303133;
    }

    .login-btn {
      width: 100%;
      margin-top: 12px;
    }
  }
}
</style>