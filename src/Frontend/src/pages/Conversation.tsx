import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Message } from '../interfaces/message';
import api from '../axiosConfig';
import { useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Conversation } from '../interfaces/conversation';
import MessageCard from '../components/MessageCard/MessageCard';

const ConversationPage = () => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationData, setConversationData] = useState<
    Conversation | undefined
  >();
  const [sendMessage, setSendMessage] = useState('');
  const { conversation_id } = useParams<{ conversation_id: string }>();
  const { token } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      // loadMessages();
      const [conv_data, message_data] = await Promise.all([
        api.get(`/api/conversations/${conversation_id}`),
        api.get(`/api/conversations/${conversation_id}/messages`),
      ]);
      setMessages(message_data.data);
      setConversationData(conv_data.data);
      setLoading(false);
    };
    loadData();
  }, [conversation_id]);

  const refreshMessages = () => {
    api.get(`/api/conversations/${conversation_id}/messages`).then((data) => {
      setMessages(data.data);
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper sx={{ background: 'rgb(50,50,50)', p: 3, borderRadius: 10 }}>
            <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
              <b>Title:</b> {conversationData?.title}
            </Typography>
            <Typography sx={{ color: 'white' }}>
              <b>Description:</b> {conversationData?.description}
            </Typography>
            <Typography sx={{ color: 'white', mt: 1 }}>
              <b>Creator:</b> {conversationData?.creator_nickname} (
              {conversationData?.creator_id})
            </Typography>
            {conversationData?.created_at && (
              <Typography sx={{ color: 'white', mt: 1 }}>
                <b>Created at:</b>{' '}
                {new Date(conversationData?.created_at).toLocaleString()}
              </Typography>
            )}
          </Paper>
          <Box sx={{ mt: 2 }}>
            {messages.map((message) => (
              <MessageCard message={message} key={message.id} />
            ))}
          </Box>
          <Paper
            sx={{
              background: 'rgb(200,200,200)',
              p: 3,
              borderRadius: 10,
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography fontSize={18} fontWeight={500}>
              Send a message
            </Typography>
            <TextField
              multiline
              maxRows={6}
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
              sx={{ width: '100%', mt: 2 }}
            />
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                if (sendMessage.trim() === '') {
                  return;
                }
                api
                  .post(
                    `/api/conversations/${conversation_id}`,
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
                    refreshMessages();
                  });
              }}
            >
              Send message
            </Button>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default ConversationPage;
