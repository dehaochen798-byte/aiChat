export interface KnowledgeResponse {
  id: number;
  categoryName: string;
  description: string;
  sortOrder: number;
  status: number;
  statusText: string;
  articleCount: number;
  createdAt: string;
  updatedAt: string;
}

//下拉框
export interface FormItemConfig {
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

//知识文章列表
export interface KnowledgeArticleResponse {
  records: KnowledgeArticleList[];
  total: number;
  size: number;
  current: number; //当前页码
  pages: number;
}

//文章列表数据
export interface KnowledgeArticleList {
  id: string;
  categoryId: number;
  categoryName: string;
  title: string;
  summary: string;
  coverImage?: string;
  tags?: string;
  tagArray?: string[];
  authorName: string;
  readCount: number;
  status: number;
  statusText: string;
  isFavorited: boolean;
  favoriteCount: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

//文章表单数据-增加
export interface KnowledgeFormData {
  title: string;
  content: string;
  coverImage: string;
  categoryId: number;
  summary: string;
  tags: string;
  id: string;
}

export interface CategoryOptions {
  label: string;
  value: string | number;
}
