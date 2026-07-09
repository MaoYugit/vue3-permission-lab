<template>
  <el-container class="layout-container">
    <el-aside width="200px" class="layout-aside">
      <div class="logo">权限后台管理</div>
      <el-menu default-active="/dashboard" router>
        <el-menu-item index="/dashboard">
          <span>控制台</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div class="header-left">
          <span>当前角色: 游客</span>
        </div>
        <div class="header-right">
          <el-button link @click="logout">退出登录</el-button>
        </div>
      </el-header>
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const logout = () => router.push('/login');
</script>

<style scoped lang="scss">
.layout-container {
  height: 100vh;

  .layout-aside {
    background-color: #304156;
    color: #fff;

    .logo {
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-weight: bold;
      background-color: #2b2f3a;
    }
  }

  .layout-header {
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }

  .layout-main {
    background-color: #f0f2f5;
  }
}
</style>