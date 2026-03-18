<template>
  <div class="frontend-layout">
    <div class="navbar-container">
      <div class="brand-section">
        <el-image
          :src="iconImg"
          alt="logo"
          class="brand-logo"
          style="width: 50px; height: 50px"
        />
        <h1 class="brand-name">心理健康ai助手</h1>
      </div>
      <div class="nav-section">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/consultations" class="nav-link" v-if="isLogin"
          >AI咨询</router-link
        >
        <router-link to="/emotion-diary" class="nav-link" v-if="isLogin"
          >情绪日记</router-link
        >
        <router-link to="/knowledge" class="nav-link">知识库</router-link>
        <el-button class="logout-btn" v-if="isLogin" @click="handleLogout"
          >退出登录</el-button
        >
        <template v-else>
          <router-link to="/auth/login" class="nav-link">登录</router-link>
          <router-link to="/auth/register" class="nav-link">
            <el-button type="primary">注册</el-button>
          </router-link>
        </template>
      </div>
    </div>
    <div class="content-container">
      <router-view></router-view>
    </div>
    <div class="footer-container">
      <div class="footer-bottom">
        <p>&copy; 2026 AIChat. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { logout } from "@/api/admin";
import { ElMessageBox } from "element-plus";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const iconImg = new URL("@/assets/images/机器人.png", import.meta.url).href;

const isLogin = ref(false);

const handleLogout = () => {
  ElMessageBox.confirm("确定退出登录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    logout()
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        router.push("/auth/login");

        ElMessageBox({
          message: "退出登录成功",
          type: "success",
        });
      })
      .catch(() => {
        ElMessageBox({
          message: "退出登录失败",
          type: "info",
        });
      });
  });
};

onMounted(() => {
  isLogin.value = localStorage.getItem("token") !== null;
});
</script>
<style scoped lang="scss">
.frontend-layout {
  background-color: #fff;
  .navbar-container {
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .brand-section {
      display: flex;
      align-items: center;
      .brand-name {
        margin-left: 10px;
        font-size: 24px;
        font-weight: 600;
        color: #333;
      }
    }
    .nav-section {
      display: flex;
      align-items: center;
      gap: 40px;
      .nav-link {
        color: #4b5563;
        font-size: 16px;
        font-weight: 500;
        &:hover {
          color: #4a90e2;
        }
      }
    }
  }

  .footer-container {
    background: #1f2937;
    color: white;
    padding: 15px 0;
    margin-top: auto;
    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 10px;
      text-align: center;
    }
  }
}
</style>
