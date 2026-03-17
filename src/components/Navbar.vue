<template>
  <div class="navbar">
    <div class="flex-box">
      <el-button @click="handleCollapsed">
        <el-icon><Expand /></el-icon>
      </el-button>
      <p class="page-title">{{ route.meta.title }}</p>
    </div>
    <div class="flex-box">
      <el-dropdown @command="handleCommand">
        <div class="flex-box">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
          <p class="user-name">admin</p>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAdminStore } from "@/store/admin";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox } from "element-plus";
import { logout } from "@/api/admin";

const router = useRouter();
const route = useRoute();

const handleCommand = (command: string) => {
  if (command === "logout") {
    ElMessageBox.confirm("确定退出登录吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        logout().then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");

          router.push("/auth/login");

          ElMessageBox({
            message: "退出登录成功",
            type: "success",
          });
        });
      })
      .catch(() => {
        // 取消退出登录
      });
  }
};

const handleCollapsed = () => {
  const adminStore = useAdminStore();
  adminStore.toggleCollapsed();
};
</script>
<style scoped lang="scss">
.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background: white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid rgba(247, 253, 253, 0.982);
  .flex-box {
    display: flex;
    align-items: center;
    justify-content: center;
    .page-title {
      font-size: 20px;
      font-weight: bold;
      margin-left: 10px;
      color: #001529;
    }
  }
}
</style>
