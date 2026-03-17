import { createRouter, createWebHistory } from "vue-router";
import ManageLayout from "@/components/ManageLayout.vue";
import AuthLayout from "@/components/AuthLayout.vue";

//路由配置
const managerRouter = [
  {
    path: "/manage",
    redirect: "/manage/dashboard",
    component: ManageLayout,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/DashBoard.vue"),
        meta: {
          title: "数据分析",
          icon: "PieChart",
        },
      },
      {
        path: "knowledge",
        component: () => import("@/views/Knowledge.vue"),
        meta: {
          title: "知识文章",
          icon: "ChatLineSquare",
        },
      },
      {
        path: "consultations",
        component: () => import("@/views/Consultations.vue"),
        meta: {
          title: "咨询记录",
          icon: "Message",
        },
      },
      {
        path: "emotional",
        component: () => import("@/views/Emotional.vue"),
        meta: {
          title: "情绪日志",
          icon: "User",
        },
      },
    ],
  },
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/Login.vue"),
        meta: {
          title: "登录",
        },
      },
      {
        path: "register",
        component: () => import("@/views/Register.vue"),
        meta: {
          title: "注册",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: managerRouter,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (token) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (userInfo.userType === 2) {
      if (to.path.startsWith("/manage")) {
        next();
      } else {
        next("/manage/dashboard");
      }
    } else if (userInfo.userType === 1) {
      next("/auth/login");
    }
  } else {
    if (to.path.startsWith("/manage")) {
      next("/auth/login");
    } else {
      next();
    }
  }
});

export default router;
