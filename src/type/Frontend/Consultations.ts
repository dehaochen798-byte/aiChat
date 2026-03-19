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
export interface frontendConsultationDetailMessage {
  content: string;
  contentLength: number;
  contentPreview: string;
  createdAt: string;
  id: number;
  messageType: number;
  messageTypeDesc: string;
  senderType: number;
  senderTypeDesc: string;
  sessionId: number;
}
