<template>
  <div class="navbar">
    <div class="flex-box">
      <el-button @click="handleCollapsed">
        <el-icon><Expand /></el-icon>
      </el-button>
      <p class="page-title">导航栏</p>
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

const handleCommand = (command: string) => {
  console.log(command);
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
