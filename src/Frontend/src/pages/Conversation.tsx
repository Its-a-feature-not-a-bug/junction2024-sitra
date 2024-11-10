import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Message } from '../interfaces/message';
import api from '../axiosConfig';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Conversation = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendMessage, setSendMessage] = useState('');
  const { conversation_id } = useParams<{ conversation_id: string }>();
  const { token } = useAuth();

  const loadMessages = () => {
    api.get(`/api/conversations/${conversation_id}`).then((data) => {
      setMessages(data.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadMessages();
  }, [conversation_id]);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography variant="h4">Conversation {conversation_id}</Typography>
          <Box>
            {messages.map((message) => (
              <Box>
                <Typography>{message.user_nickname}</Typography>
                <Typography>{message.content}</Typography>
                <Typography>{message.timestamp.toString()}</Typography>
              </Box>
            ))}
          </Box>
          <Box>
            <Typography>Send a message</Typography>
            <TextField
              multiline
              maxRows={6}
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
            />
            <Button
              onClick={() => {
                api
                  .post(
                    `/conversations/${conversation_id}`,
                    {
                      content: sendMessage,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then(() => {
                    setSendMessage('');
                    loadMessages();
                  });
              }}
            >
              Send message
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Conversation;
