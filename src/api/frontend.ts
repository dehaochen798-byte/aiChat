import type {
  frontendConsultationDetailMessageAll,
  frontendConsultationSessionListResponse,
  frontendConsultationSessionResponse,
} from "@/type/Frontend/Consultations";
import type { RegisterForm, RegisterResponse } from "@/type/Register";
import request from "@/utils/request";

export const register = (data: RegisterForm): Promise<RegisterResponse> => {
  return request.post("/user/add", data);
};

// 开始会话
export const startSession = (data: {
  initialMessage: string;
  sessionTitle: string;
}): Promise<frontendConsultationSessionResponse> => {
  return request.post("/psychological-chat/session/start", data);
};

// 获取会话列表
export const getSessionList = (data: {
  pageNum: string;
  pageSize: string;
}): Promise<{
  records: frontendConsultationSessionListResponse[];
}> => {
  return request.get("/psychological-chat/sessions", { params: data });
};

// 删除会话
export const deleteSession = (sessionId: string): Promise<boolean> => {
  return request.delete(`/psychological-chat/sessions/${sessionId}`);
};

// 获取会话详情
export const getSessionDetail = (
  sessionId: string,
): Promise<frontendConsultationDetailMessageAll[]> => {
  return request.get(`/psychological-chat/sessions/${sessionId}/messages`);
};
