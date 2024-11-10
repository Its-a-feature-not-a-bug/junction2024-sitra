import { useState } from 'react';
import { useAuth } from '../../AuthContext';
import api from '../../axiosConfig';

const CreateConversation = () => {
  const [conversationName, setConversationName] = useState('');
  const { token } = useAuth();

  const handleCreateConversation = async () => {
    try {
      await api.post(
        '/conversations',
        {
          name: conversationName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConversationName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={conversationName}
        onChange={(e) => setConversationName(e.target.value)}
      />
      <button onClick={handleCreateConversation}>Create Conversation</button>
    </div>
  );
};

export default CreateConversation;
