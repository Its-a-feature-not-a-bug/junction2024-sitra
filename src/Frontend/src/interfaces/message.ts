export interface Message {
  id: number;
  conversation_id: number;
  user_id: number;
  user_nickname: string;
  content: string;
  media_url: string;
  timestamp: Date;
}
