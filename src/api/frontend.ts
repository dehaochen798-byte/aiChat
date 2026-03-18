import type { RegisterForm, RegisterResponse } from "@/type/Register";
import request from "@/utils/request";

export const register = (data: RegisterForm): Promise<RegisterResponse> => {
  return request.post("/user/add", data);
};
