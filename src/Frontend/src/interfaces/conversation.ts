export interface Conversation {
  id: number;
  title: string;
  description: string;
  is_group: boolean;
  cretor_id: string;
  cretor_nickname: string;
  created_at: Date;
  updated_at: Date;
}
