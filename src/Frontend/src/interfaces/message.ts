export interface Message {
  id: number;
  conversation_id: number;
  user_id: number;
  user_nickname: string;
  content: string;
  media_url: string;
  timestamp: string;
  anger_score?: number;
  emotional_intensity_score?: number;
  bias_score?: number;
  score_reason?: string;
}
