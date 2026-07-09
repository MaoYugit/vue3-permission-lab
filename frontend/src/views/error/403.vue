<template>
  <div class="err-container">
    <el-result title="403" sub-title="抱歉，您无权访问该页面">
      <template #icon>
        <el-image src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b001-1835-11e9-9851-89e4e56d1912.png" />
      </template>
      <template #extra>
        <el-button type="primary" @click="goHome">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const goHome = () => router.push('/');
</script>

<style scoped>
.err-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>