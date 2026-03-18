import { createRouter, createWebHistory } from "vue-router";

//路由配置
const managerRouter = [
  {
    path: "/manage",
    redirect: "/manage/dashboard",
    component: () => import("@/components/ManageLayout.vue"),
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
    component: () => import("@/components/AuthLayout.vue"),
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

//前台路由
const frontendRouters = [
  {
    path: "/",
    component: () => import("@/components/Frontend/FrontendLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/components/Frontend/Home.vue"),
        meta: {
          title: "首页",
        },
      },
      {
        path: "consultations",
        component: () => import("@/components/Frontend/Consultations.vue"),
        meta: {
          title: "AI咨询",
        },
      },
      {
        path: "emotion-diary",
        component: () => import("@/components/Frontend/EmotionDiary.vue"),
        meta: {
          title: "情绪日记",
        },
      },
      {
        path: "knowledge",
        component: () => import("@/components/Frontend/FrontendKnowledge.vue"),
        meta: {
          title: "知识库",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: [...managerRouter, ...frontendRouters],
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
      if (to.path.startsWith("/manage") || to.path.startsWith("/auth")) {
        next("/");
      } else {
        next();
      }
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
