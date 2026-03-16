<template>
  <div class="manage-layout">
    <el-container class="manage-container">
      <Sidebar></Sidebar>
      <el-container>
        <el-header>
          <Navbar></Navbar>
        </el-header>
        <el-main class="main-container">
          <router-view class="content-container"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
</script>
<style scoped lang="scss">
.manage-layout {
  height: 100vh;
  .manage-container {
    height: 100%;
  }
  .el-header {
    height: 72px !important;
  }
  .main-container {
    height: 100%;
    .content-container {
      padding: 20px;
      background-color: #f7fdfd;
      min-height: calc(100% - 76px);
    }
  }
}
</style>
