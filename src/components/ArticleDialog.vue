<template>
  <el-dialog
    :title="isEdit ? '编辑文章' : '新增文章'"
    v-model="dialogVisible"
    width="50%"
    @close="handleClose"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入文章标题"
          maxlength="200"
          show-word-limit
          clearable
        />
      </el-form-item>
      <el-form-item label="文章分类" prop="categoryId">
        <el-select
          v-model="formData.categoryId"
          placeholder="请选择文章分类"
          clearable
        >
          <el-option
            v-for="item in props.categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文章摘要" prop="summary">
        <el-input
          type="textarea"
          v-model="formData.summary"
          placeholder="请输入文章摘要（可选）"
          maxlength="1000"
          show-word-limit
          :rows="4"
        />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select
          v-model="formData.tagArray"
          placeholder="请输入标签，多个标签用逗号分隔"
          multiple
          filterable
          allow-create
          style="width: 100%"
        >
          <el-option
            v-for="tag in commonTags"
            :key="tag"
            :label="tag"
            :value="tag"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片">
        <div class="cover-upload">
          <el-upload
            class="avatar-uploader"
            action="#"
            :before-upload="beforeUpload"
            :http-request="handlerUploadRequest"
            :show-file-list="false"
            accept="image/*"
          >
            <div v-if="!coverImage" class="cover-placeholder">
              <p>点击上传封面图片</p>
            </div>
            <img
              v-else
              :src="coverImage"
              class="cover-image"
              alt="封面图片"
              style="width: 200px; height: 100px"
            />
          </el-upload>
          <div v-if="coverImage" class="remove-button">
            <el-button type="danger" size="mini" @click="handleRemove"
              >移除封面</el-button
            >
          </div>
        </div>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <RichTextEditor
          v-model="formData.content"
          placeholder="请输入文章内容"
          :maxCharCount="5000"
          @change="handleContentChange"
          @created="handleEditorCreated"
          min-height="400px"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div v-if="btnPreview">
        <h3>内容预览</h3>
        <div v-html="formData.content"></div>
      </div>
      <el-button @click="btnPreview = !btnPreview">{{
        btnPreview ? "隐藏预览" : "预览效果"
      }}</el-button>
      <el-button @click="handleClose">取消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit(formRef)"
        :loading="loading"
        >{{ isEdit ? "更新文章" : "创建文章" }}</el-button
      >
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { createArticle, uploadFile, updateArticle } from "@/api/admin";
import type { CategoryOptions, KnowledgeArticleList } from "@/type/knowledge";
import { ElMessage } from "element-plus";
import {
  computed,
  nextTick,
  reactive,
  ref,
  watch,
  type PropType,
  type Ref,
} from "vue";
import { fileBaseUrl } from "@/config/index";
import RichTextEditor from "@/components/RichTextEditor.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array as PropType<CategoryOptions[]>,
    default: () => [],
  },
  article: {
    type: Object as PropType<
      KnowledgeArticleList | Partial<KnowledgeArticleList> | null
    >,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "success"]);

interface KnowledgeFormData {
  title: string;
  content: string;
  coverImage: string;
  categoryId: number;
  summary: string;
  tagArray?: string[];
  tags: string;
  id: string;
}

const dialogVisible = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const isEdit = computed(() => !!props.article?.id);

//监听编辑数据
watch(
  () => props.article,
  (newVal) => {
    if (newVal) {
      nextTick(() => {
        Object.assign(formData, newVal);
        //使用现有的id
        coverImage.value = fileBaseUrl + newVal.coverImage;
        if (!newVal.id) return;
        businessId.value = newVal.id;
      });
    }
  }
);

const handleClose = () => {
  //重置表单
  formRef.value.resetFields();
  businessId.value = null;
  formData.tagArray = [];
  handleRemove();
  emit("update:modelValue", false);
};

// 表单数据
const formData = reactive<KnowledgeFormData>({
  title: "",
  content: "",
  coverImage: "",
  categoryId: 1,
  summary: "",
  tagArray: [],
  tags: "",
  id: "",
});

const rules = reactive({
  title: [
    { required: true, message: "请输入文章标题", trigger: "blur" },
    {
      min: 1,
      max: 200,
      message: "标题长度必须在1-200个字符之间",
      trigger: "blur",
    },
  ],
  categoryId: [{ required: true, message: "请输入文章分类", trigger: "blur" }],
  content: [
    { required: true, message: "请输入文章内容", trigger: "blur" },
    {
      min: 1,
      max: 5000,
      message: "内容长度必须在1-5000个字符之间",
      trigger: "blur",
    },
  ],
});

const commonTags = [
  "情绪管理",
  "焦虑",
  "抑郁",
  "压力",
  "睡眠",
  "冥想",
  "正念",
  "放松",
  "心理健康",
  "自我成长",
  "人际关系",
  "工作压力",
  "学习方法",
  "生活技巧",
];

//上传
const coverImage = ref("");

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith("image/");
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isImage) {
    ElMessage.error("上传封面图片只能是图片格式");
    return false;
  }
  if (!isLt5M) {
    ElMessage.error("上传封面图片大小不能超过5MB");
    return false;
  }
  return true;
};

const businessId: Ref<string | null> = ref(null);

const handlerUploadRequest = async (file: any) => {
  const realFile: File = file.file;
  //UUID生成
  businessId.value = crypto.randomUUID();
  //   console.log(realFile);
  const res = await uploadFile(realFile, {
    businessId: businessId.value,
  });
  //   console.log(res);
  //拼接图片url
  coverImage.value = fileBaseUrl + res.filePath;
  formData.coverImage = res.filePath;
};

const handleRemove = () => {
  coverImage.value = "";
  formData.coverImage = "";
};

//富文本
const handleContentChange = (data: { html: string; text: string }) => {
  console.log(data);
  formData.content = data.html;
};

const editorInstance = ref<string>("");
const handleEditorCreated = (editor: any) => {
  editorInstance.value = editor;

  // console.log(editor, "editor");
  //编辑
  if (formData.content && editor) {
    nextTick(() => {
      editor.setHtml(formData.content);
    });
  }
};

const btnPreview = ref<boolean>(false);

//提交
const formRef = ref<any>(null);
const loading = ref<boolean>(false);
const handleSubmit = async (formRef: any) => {
  // console.log(formRef,"biaodanyaunsu");
  formRef.validate((valid: boolean, fields: any) => {
    if (valid) {
      // console.log(formData);
      loading.value = true;
    }
    if (!formData.tagArray) {
      return;
    }
    const submitData = {
      ...formData,

      tags: formData.tagArray.join(","),
    };
    delete submitData.tagArray;

    if (!isEdit.value) {
      createArticle(submitData).then((res) => {
        console.log(res);
        if (res.id) {
          ElMessage.success("创建成功");
          dialogVisible.value = false;
          loading.value = false;
          emit("success");
        } else {
          ElMessage.error("创建失败");
          loading.value = false;
        }
      });
    } else {
      if (!props.article || !props.article.id) {
        ElMessage.error("文章不存在");
        loading.value = false;
        return;
      }
      updateArticle(props.article.id, submitData).then((res) => {
        loading.value = false;
        emit("success");
      });
    }
  });

  loading.value = true;
};
</script>
<style scoped lang="scss">
.cover-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  border: 2px dashed #ccc;
  border-radius: 4px;
  background-color: rgb(236, 239, 241);
  flex-direction: column;
}
</style>
