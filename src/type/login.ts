export interface LoginResponse {
  userInfo: {
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
  };
  token: string;
  roleType: string;
}
