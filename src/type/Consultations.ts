export interface ConsultationSessions {
  records: ConsultationRecord[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

export interface ConsultationRecord {
  id: number;
  userId: number;
  userNickname: string;
  sessionTitle: string;
  startedAt: string;
  durationMinutes: number;
  messageCount: number;
  lastMessageContent: string;
  lastMessageTime: string;
}

export interface SessionDialogDetail {
  aiModel?: string;
  id: number;
  sessionId: number;
  senderType: number;
  senderTypeDesc: string;
  messageType: number;
  messageTypeDesc: string;
  content: string;
  createdAt: string;
  contentLength: number;
  contentPreview: string;
}
