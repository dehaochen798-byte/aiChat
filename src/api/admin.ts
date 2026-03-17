import service from "@/utils/request";
import type { LoginResponse } from "@/type/login";
import type {
  KnowledgeArticleList,
  KnowledgeArticleResponse,
  KnowledgeFormData,
  KnowledgeResponse,
} from "@/type/knowledge";
import type {
  ConsultationSessions,
  SessionDialogDetail,
} from "@/type/Consultations";
import type { EmotionalQuery, EmotionalResponse } from "@/type/Emotional";
import type { AnalyticsOverviewResponse } from "@/type/DashBoard";

export function login(data: {
  username: string;
  password: string;
}): Promise<LoginResponse> {
  return service({
    url: "/user/login",
    method: "post",
    data,
  });
}

//知识文章
export function categoryTree(): Promise<KnowledgeResponse[]> {
  return service.get("/knowledge/category/tree");
}

export function articlePage(params: {
  title?: string;
  categoryId?: string;
  status?: string;
  authorName?: string;
  currentPage?: string;
  size?: string;
}): Promise<KnowledgeArticleResponse> {
  return service.get("/knowledge/article/page", { params });
}

export function uploadFile(
  file: File,
  businessInfo: {
    businessId: string;
  }
): Promise<{
  filePath: string;
}> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("businessType", "ARTICLE");
  formData.append("businessId", businessInfo.businessId);
  formData.append("businessField", "cover");

  return service.post("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function createArticle(data: KnowledgeFormData): Promise<{
  id: string;
  categoryId: number;
  categoryName: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  tags: string;
  tagArray: string[];
  authorId: number;
  authorName: string;
  readCount: number;
  status: number;
  statusText: string;
  isFavorited: boolean;
  createdAt: string;
  updatedAt: string;
}> {
  return service.post("/knowledge/article", data);
}

export function getArticleDetail(id: string): Promise<KnowledgeArticleList> {
  return service.get(`/knowledge/article/${id}`);
}

export function updateArticle(
  id: string,
  data: KnowledgeFormData
): Promise<KnowledgeArticleList> {
  return service.put(`/knowledge/article/${id}`, data);
}

export function publishArticleStatus(
  id: string,
  data: { status: string }
): Promise<KnowledgeArticleList> {
  return service.put(`/knowledge/article/${id}/status`, data);
}

export function deleteArticle(id: string): Promise<{
  code: number;
  message: string;
}> {
  return service.delete(`/knowledge/article/${id}`);
}

//咨询记录
export function getConsultationPage(params: {
  currentPage?: string;
  size?: string;
  emotionTag?: string;
  total?: number;
}): Promise<ConsultationSessions> {
  return service.get("/psychological-chat/sessions", { params });
}

export function getSessionDetail(
  sessionId: string
): Promise<SessionDialogDetail[]> {
  return service.get(`/psychological-chat/sessions/${sessionId}/messages`);
}

//情绪日志
export function getEmotionalPage(
  params: EmotionalQuery
): Promise<EmotionalResponse> {
  return service.get("/emotion-diary/admin/page", { params });
}

export function deleteEmotional(id: string): Promise<{
  code: number;
  message: string;
}> {
  return service.delete(`/emotion-diary/admin/${id}`);
}

//数据分析
export function getAnalyticsOverview(): Promise<AnalyticsOverviewResponse> {
  return service.get("/data-analytics/overview");
}

export function logout() {
  return service.post("/user/logout");
}
