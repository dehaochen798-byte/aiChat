<template>
  <div class="container">
    <div class="title">
      <div class="back-home">
        <el-icon><Back /></el-icon>回到首页
      </div>
      <div class="title-text">
        <h2>登录您的账户</h2>
        <p>输入您的账号密码登录</p>
      </div>
    </div>
    <div class="form-container">
      <el-form
        ref="ruleFormRef"
        :model="formData"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="用户名和邮箱" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            placeholder="请输入密码"
            type="password"
            show-password
            size="large"
          ></el-input>
        </el-form-item>
        <el-button
          class="btn"
          size="large"
          type="primary"
          @click="submitForm(ruleFormRef)"
        >
          登录
        </el-button>
      </el-form>
      <div class="footer">
        <p>
          还没有账户？<router-link to="/auth/register">去注册 </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
import { login } from "@/api/admin";
import { useRouter } from "vue-router";

const router = useRouter();

const ruleFormRef = ref<FormInstance>();

const formData = reactive({
  username: "",
  password: "",
});

const rules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("表单验证通过", fields);
      console.log(formData);
      login(formData).then((data) => {
        if (!data.token) {
          ElMessage.error("登录失败");
          return;
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
        ElMessage.success("登录成功");
        if (data.userInfo.userType === 2) {
          router.push("/manage/dashboard");
        } else {
        }
      });
    }
  });
};
</script>
<style scoped lang="scss">
.container {
  width: 384px;
  .title {
    .back-home {
      margin-bottom: 60px;
    }
    .title-text {
      text-align: center;
      h2 {
        font-size: 36px;
        margin-bottom: 10px;
      }
      p {
        font-size: 16px;
        color: #6c7ea0;
      }
    }
  }
  .form-container {
    margin-top: 33px;
    .btn {
      margin-top: 40px;
      width: 100%;
    }
    .footer {
      text-align: center;
      p {
        font-size: 16px;
        color: #6c7ea0;
      }
    }
  }
}
</style>
