<template>
  <el-form ref="formRef" :model="formData">
    <el-row :gutter="24">
      <template v-for="item in formItemAttrs" :key="item.prop">
        <el-col v-bind="item.col">
          <el-form-item :label="item.label" :prop="item.prop">
            <component
              v-model="formData[item.prop]"
              :is="isComp(item.comp)"
              :placeholder="item.placeholder"
            >
              <template v-if="item.comp === 'select'">
                <el-option label="全部" value=""> </el-option>
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value"
                >
                </el-option>
              </template>
            </component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <el-row>
      <el-button type="primary" @click="handleSearch">查询</el-button>
      <el-button @click="handleReset(formRef)">重置</el-button>
    </el-row>
  </el-form>
</template>
<script setup lang="ts">
import { type PropType } from "vue";
import { ref, reactive, computed } from "vue";
import type { FormInstance } from "element-plus";

const props = defineProps({
  formItem: {
    type: Array as PropType<FormItemConfig[]>,
    default: () => [],
  },
});

const emit = defineEmits(["search", "reset"]);

const formItemAttrs = computed(() => {
  const { formItem } = props;
  formItem.forEach((item) => {
    item.col = {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 6,
      xl: 4,
    };
  });
  return formItem;
});

type Elformcomp = "";
interface FormItemConfig {
  comp: string;
  prop: string;
  label: string;
  col?: Record<string, string | number>;
  //下拉框默认显示内容
  placeholder?: string;
  options?: {
    label: string;
    value: string | number;
  }[];
}

interface FormData {
  [key: string]: string | number | string[] | number[] | undefined;
}

const formRef = ref<FormInstance>();

const formData = reactive<FormData>({});

const isComp = (comp: string) => {
  return {
    input: "el-input",
    select: "el-select",
  }[comp];
};

const handleSearch = () => {
  // console.log(formData);
  emit("search", formData);
};

const handleReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emit("reset", formData);
};
</script>
<style scoped lang="scss"></style>
