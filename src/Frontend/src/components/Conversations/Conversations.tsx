import { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import {
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Conversation } from '../../interfaces/conversation';

const Conversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      const response = await api.get('/api/conversations');
      setConversations(response.data);
      setLoading(false);
    };
    fetchConversations();
  }, []);

  return (
    <Container>
      <Typography variant="h4">Conversations</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {conversations.map((conversation) => (
            <ListItem
              key={conversation.id}
              onClick={() => navigate(`/conversation/${conversation.id}`)}
              sx={{ cursor: 'pointer' }}
            >
              <ListItemText primary={conversation.name} />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Conversations;
