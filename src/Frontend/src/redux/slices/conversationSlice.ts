import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation } from '../../interfaces/conversation';

interface ConversationState {
  conversations: Conversation[];
}

const initialState: ConversationState = {
  conversations: [],
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversation: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
  },
});

export const { setConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
