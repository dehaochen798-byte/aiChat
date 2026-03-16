export interface AnalyticsOverviewResponse {
  consultationStats: consultationStats;
  emotionHeatmap: emotionHeatmap;
  emotionTrend: emotionTrend[];
  systemOverview: systemOverview;
  userActivity: userActivity[];
}

//
export interface consultationStats {
  avgDurationMinutes: number;
  dailyTrend: dailyTrend[];
  totalSessions: number;
}
export interface dailyTrend {
  date: string;
  sessionCount: number;
  userCount: number;
}

//
export interface emotionHeatmap {
  dateRange: string;
  emotionDistribution: { [key: string]: number };
  gridData: EmotionDistribution[][];
  peakEmotionTime: string;
}
export interface EmotionDistribution {
  avgMoodScore: number;
  dominantEmotion: string;
  value: number;
  x: number;
  y: number;
}

//
export interface emotionTrend {
  avgMoodScore: number;
  date: string;
  dominantEmotion: string;
  negativeRatio: number;
  positiveRatio: number;
  recordCount: number;
}

//
export interface systemOverview {
  activeUsers: number;
  avgMoodScore: number;
  todayNewDiaries: number;
  todayNewSessions: number;
  todayNewUsers: number;
  totalDiaries: number;
  totalSessions: number;
  totalUsers: number;
}

//
export interface userActivity {
  activeUsers: number;
  consultationUsers: number;
  date: string;
  diaryUsers: number;
  newUsers: number;
}

//
