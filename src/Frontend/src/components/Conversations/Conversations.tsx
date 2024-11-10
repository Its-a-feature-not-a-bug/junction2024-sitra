import { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import {
  Box,
  CircularProgress,
  Typography,
  Grid2 as Grid,
  Paper,
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
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 500, marginBottom: 2 }}>
        Featured conversations
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {conversations.map((conversation) => (
            <Grid item size={{ xs: 12, md: 6, lg: 4 }}>
              <Paper
                onClick={() => navigate(`/conversation/${conversation.id}`)}
                sx={{
                  cursor: 'pointer',
                  padding: 4,
                  minHeight: 100,
                  background: 'rgb(50,50,50)',
                  borderRadius: 8,
                  color: 'white',
                }}
              >
                <Typography variant="h6">{conversation.title}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Conversations;
