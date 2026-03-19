export interface frontendConsultationSessionResponse {
  expiryTime: number;
  initialMessage: string;
  messageCount: number;
  sessionId: string;
  startTime: number;
  status: string;
  userHash: number;
}

export interface frontendConsultationSessionListResponse {
  durationMinutes: number;
  id: number;
  lastMessageContent: string;
  lastMessageTime: string;
  messageCount: number;
  sessionTitle: string;
  startedAt: string;
  userId: number;
}

//详细数据
export interface frontendConsultationDetailMessageAll {
  id: number;
  sessionId: number;
  senderType: number;
  senderTypeDesc: string;
  messageType: number;
  messageTypeDesc: string;
  content: string;
  aiModel?: string;
  createdAt: string;
  contentLength: number;
  contentPreview: string;
}
