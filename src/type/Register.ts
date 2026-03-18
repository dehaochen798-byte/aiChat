export interface RegisterForm {
  username: string;
  email: string;
  nickname?: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  gender: number;
  userType: number;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  nickname: string;
  phone: string;
  gender: number;
  genderDisplayName: string;
  userType: number;
  userTypeDisplayName: string;
  status: number;
  statusDisplayName: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
}
