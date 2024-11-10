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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setConversation } from '../../redux/slices/conversationSlice';

const Conversations = () => {
  const dispatch = useDispatch();
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversationsData = async () => {
      const response = await api.get('/api/conversations');
      dispatch(setConversation(response.data));
    };
    fetchConversationsData();
    setLoading(false);
  }, [dispatch]);

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
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={conversation.id}>
              <Paper
                onClick={() => navigate(`/conversation/${conversation.id}`)}
                sx={{
                  cursor: 'pointer',
                  padding: 3,
                  minHeight: 130,
                  background: 'rgb(50,50,50)',
                  borderRadius: 8,
                  color: 'white',
                }}
              >
                <Typography variant="h6">{conversation.title}</Typography>
                <Typography variant="body2">
                  {conversation.description.length < 100
                    ? conversation.description
                    : `${conversation.description.slice(0, 100)}...`}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Conversations;
