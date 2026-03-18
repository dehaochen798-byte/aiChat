<template>
  <div class="container">
    <div class="title">
      <div class="title-text">
        <h2>创建您的账户</h2>
        <p>请填注册信息</p>
      </div>
    </div>
    <div class="form-container">
      <el-form
        :model="forData"
        ref="submitFormRef"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username" class="form-item">
          <el-input
            v-model="forData.username"
            placeholder="请输入用户名"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" class="form-item">
          <el-input
            v-model="forData.email"
            placeholder="请输入邮箱"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname" class="form-item">
          <el-input
            v-model="forData.nickname"
            placeholder="请输入昵称（可选）"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" class="form-item">
          <el-input
            v-model="forData.phone"
            placeholder="请输入手机号（可选）"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="form-item">
          <el-input
            v-model="forData.password"
            placeholder="请输入密码"
            size="large"
            show-password
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" class="form-item">
          <el-input
            v-model="forData.confirmPassword"
            placeholder="请确认密码"
            size="large"
            show-password
            type="password"
          ></el-input>
        </el-form-item>

        <el-button
          type="primary"
          class="btn"
          size="large"
          @click="submitForm(submitFormRef)"
        >
          注册
        </el-button>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { register } from "@/api/frontend";
import { useRouter } from "vue-router";
import type { RegisterForm } from "@/type/Register";
import { ElMessage, type FormInstance } from "element-plus";
import { reactive, ref, type Ref } from "vue";

const router = useRouter();

const forData = reactive<RegisterForm>({
  username: "",
  email: "",
  nickname: "",
  phone: "",
  password: "",
  confirmPassword: "",
  gender: 0,
  userType: 1, //普通用户
});

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [{ required: true, message: "请确认密码", trigger: "blur" }],
});

const submitFormRef = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    try {
      if (valid) {
        // 表单验证通过，执行注册逻辑
        register(forData).then((res) => {
          //   console.log(res);
          if (res.id !== undefined) {
            ElMessage.success("注册成功");
            router.push("/auth/login");
          } else {
            ElMessage.error("注册失败");
          }
        });
      } else {
        // 表单验证不通过，提示用户输入正确信息
        ElMessage.error("请输入正确的信息");
      }
    } catch (error) {
      ElMessage.error("注册失败");
    }
  });
};
</script>
<style scoped lang="scss">
.container {
  width: 384px;
  .flex-box {
    display: flex;
    align-items: center;
  }
  .title {
    .title-text {
      text-align: center;
      h2 {
        font-size: 36px;
        margin-bottom: 10px;
      }
      p {
        font-size: 18px;
        color: #6b7280;
      }
    }
  }
  .form-container {
    margin-top: 10px;
    .form-item {
      margin-bottom: 10px;
    }
    .btn {
      margin-top: 30px;
      width: 100%;
    }
    .footer {
      padding: 30px;
      text-align: center;
    }
  }
}
</style>
