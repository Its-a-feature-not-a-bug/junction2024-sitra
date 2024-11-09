import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../AuthContext';

const CreateConversation = () => {
  const [conversationName, setConversationName] = useState('');
  const { token } = useAuth();
  console.log({ token });
  const handleCreateConversation = async () => {
    try {
      await axios.post(
        'http://localhost:8000/conversations',
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
