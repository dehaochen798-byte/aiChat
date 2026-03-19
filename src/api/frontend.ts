import type {
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

export const getSessionList = (data: {
  pageNum: string;
  pageSize: string;
}): Promise<{
  records: frontendConsultationSessionListResponse[];
}> => {
  return request.get("/psychological-chat/sessions", { params: data });
};
