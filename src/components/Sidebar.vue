<template>
  <el-aside width="isCollapsed ? '64px' : '264px'">
    <el-menu
      default-active="2"
      class="menu-style"
      :collapse="isCollapsed"
      :collapse-transition="false"
    >
      <div class="brand">
        <el-image
          style="width: 50px; height: 50px; margin-right: 10px"
          :src="robotImage"
          alt="logo"
          class="brand-logo"
        />
        <div class="info-card" v-show="!isCollapsed">
          <h1 class="brand-title">心理健康ai助手</h1>
          <p class="brand-subtitle">管理后台</p>
        </div>
      </div>
      <el-menu-item
        v-for="item in router.options.routes[0]?.children"
        :key="item.path"
        :index="item.path"
        @click="selectMenu"
      >
        <el-icon><component :is="item.meta?.icon" /></el-icon>
        <span>{{ item.meta?.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script setup lang="ts">
import {
  useRouter,
  type RouteRecordRaw,
  type RouteLocationRaw,
} from "vue-router";
import { useAdminStore } from "@/store/admin";
import { computed } from "vue";

interface MenuKey {
  index: string | number;
}

const router = useRouter();

const robotImage = new URL("@/assets/images/机器人.png", import.meta.url).href;

const isCollapsed = computed(() => {
  return useAdminStore().isCollapsed;
});

const selectMenu = (key: MenuKey) => {
  const currentRoute = router.options.routes[0]?.path;
  router.push(`${currentRoute}/${key.index}`);
};
</script>
<style lang="scss" scoped>
.menu-style {
  height: 100%;
  .brand {
    display: flex;
    align-self: center;
    padding: 10px;
    background-color: #fef8f8;
    border-bottom: 1px solid #e4e7ed;
    .info-card {
      .brand-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
        color: #303133;
      }
    }
  }
}
</style>
