<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary" @click="handleEdit(null)">新增</el-button>
        <!-- <el-button type="primary" @click="showDialog">查看</el-button> -->
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch"></TableSearch>
    <el-table
      :data="tableData"
      style="width: 100%; height: 100%; margin-top: 25px"
    >
      <el-table-column label="文章标题" fixed="left" width="300">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span>{{ categoryMap[scope.row.categoryId] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="authorName"
        label="作者"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="readCount"
        label="阅读量"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="updatedAt"
        label="发布时间"
        width="150"
      ></el-table-column>
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button text type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="scope.row.status === 0 || scope.row.status === 2"
            text
            type="success"
            @click="handlePublish(scope.row)"
          >
            发布
          </el-button>
          <el-button
            v-if="scope.row.status === 1"
            text
            type="warning"
            @click="handleUnpublish(scope.row)"
          >
            下线
          </el-button>
          <el-button text type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 25px"
      :page-size="pagination.size"
      layout="prev,pager,next,total"
      :total="pagination.total"
      @change="handleChange"
    />
    <ArticleDialog
      v-model:modelValue="dialogVisible"
      :categories="categories"
      @success="handleSuccess"
      :article="currentArticle"
    />
  </div>
</template>
<script setup lang="ts">
import {
  articlePage,
  categoryTree,
  deleteArticle,
  getArticleDetail,
  publishArticleStatus,
} from "@/api/admin";
import PageHead from "@/components/PageHead.vue";
import TableSearch from "@/components/TableSearch.vue";
import type { CategoryOptions, KnowledgeArticleList } from "@/type/knowledge";
import { onMounted, reactive, ref, type Ref } from "vue";
import ArticleDialog from "@/components/ArticleDialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";

interface FormItemConfig {
  comp: string;
  prop: string;
  label: string;
  //下拉框默认显示内容
  placeholder?: string;
  //下拉框选项
  options?: {
    label: string;
    value: string | number;
  }[];
}

//分类映射
const categoryMap: Record<number, string> = reactive({});
//分类列表
const categories: Ref<CategoryOptions[]> = ref([]);
//列表数据
const tableData: Ref<KnowledgeArticleList[]> = ref([]);
//新增和编辑弹窗是否显示
const dialogVisible: Ref<boolean> = ref(false);

const formItem: FormItemConfig[] = [
  {
    comp: "input",
    prop: "title",
    label: "文章标题",
    placeholder: "请输入文章标题",
  },
  {
    comp: "select",
    prop: "categoryId",
    label: "分类",
    placeholder: "请选择分类",
    options: [],
  },
  {
    comp: "select",
    prop: "status",
    label: "状态",
    placeholder: "请输入文章内容",
    options: [
      {
        label: "草稿",
        value: 0,
      },
      {
        label: "已发布",
        value: 1,
      },
      {
        label: "已下线",
        value: 2,
      },
    ],
  },
];

//分页参数
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});

const handleSearch = async (formData: any) => {
  const params = {
    ...pagination,
    ...formData,
  };
  // console.log(params);
  const { records, total } = await articlePage(params);

  // console.log(records);
  // console.log(total);

  tableData.value = records;
  pagination.total = total;

  // console.log(tableData.value);
};

//分页切换
const handleChange = (page: number) => {
  pagination.currentPage = page;
  handleSearch({});
};

// const showDialog = () => {
//   console.log(dialogVisible.value);
// };

// 新增和编辑弹窗提交成功后刷新列表
const handleSuccess = () => {
  dialogVisible.value = false;
  handleSearch({});
};

const currentArticle: Ref<
  KnowledgeArticleList | Partial<KnowledgeArticleList> | null
> = ref(null);
const handleEdit = (row: KnowledgeArticleList | null) => {
  console.log(row);
  if (!row) {
    // console.log("新增");
    currentArticle.value = null;
    dialogVisible.value = true;
    return;
  }
  if (row.id) {
    //编辑
    getArticleDetail(row.id).then((res) => {
      // console.log(res);
      currentArticle.value = res;
      dialogVisible.value = true;
    });
  }
};

//发布下线与删除
// 发布
const handlePublish = (row: KnowledgeArticleList) => {
  ElMessageBox.confirm(`确认发布${row.title}吗？`, "确认发布", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "info",
  }).then(() => {
    publishArticleStatus(row.id, { status: "1" }).then((res) => {
      console.log(res);
      ElMessage.success("发布成功");
      handleSearch({});
    });
  });
};

//下线
const handleUnpublish = (row: KnowledgeArticleList) => {
  ElMessageBox.confirm(`确认下线${row.title}吗？`, "确认下线", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    publishArticleStatus(row.id, { status: "2" }).then((res) => {
      console.log(res);
      ElMessage.success("下线成功");
      handleSearch({});
    });
  });
};

//删除
const handleDelete = (row: KnowledgeArticleList) => {
  ElMessageBox.confirm(`确认删除${row.title}吗？`, "确认删除", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error",
  }).then(() => {
    deleteArticle(row.id).then((res) => {
      console.log(res);
      ElMessage.success("删除成功");
      handleSearch({});
    });
  });
};

onMounted(async () => {
  const data = await categoryTree();

  categories.value = data.map((item) => {
    categoryMap[item.id] = item.categoryName;
    return {
      label: item.categoryName,
      value: item.id,
    };
  });
  // console.log(categories.value, "分类选项");
  if (formItem[1]) {
    formItem[1].options = categories.value;
  }

  //获取列表
  handleSearch({});
});
</script>
<style scoped lang="scss"></style>
