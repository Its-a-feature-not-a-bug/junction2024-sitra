export interface Conversation {
  id: number;
  name: string;
  is_group: boolean;
  cretor_id: string;
  cretor_nickname: string;
  created_at: Date;
  updated_at: Date;
}
