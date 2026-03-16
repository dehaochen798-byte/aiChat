// 情绪日志查询参数
export interface EmotionalQuery {
  currentPage?: string;
  size?: string;
  userId?: string;
  minMoodScore?: string;
  maxMoodScore?: string;
  dominantEmotion?: string;
}

// 情绪日志响应
export interface EmotionalResponse {
  records: EmotionalResponseRecord[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

export interface EmotionalResponseRecord {
  aiAnalysisStatus: string;
  contentLength: number;
  createdAt: string;
  diaryContent: string;
  diaryContentPreview: string;
  diaryDate: string;
  dominantEmotion: string;
  emotionTriggers: string;
  hasAiEmotionAnalysis: boolean;
  aiDominantEmotion?: string;
  id: number;
  moodScore: number;
  nickname: string;
  sleepQuality: number;
  stressLevel: number;
  updatedAt: string;
  userId: number;
  username: string;
}
