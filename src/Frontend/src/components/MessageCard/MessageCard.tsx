import { Box, Paper, Typography } from '@mui/material';
import { Message } from '../../interfaces/message';
import MessageInfo from './MessageInfo';

const MessageCard = ({ message }: { message: Message }) => {
  return (
    <Paper
      sx={{
        background: 'rgb(50,50,50)',
        p: 3,
        borderRadius: 10,
        mb: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      key={message.id}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography color="white" fontWeight={700} fontSize={20}>
          {message.user_nickname}
        </Typography>
        <Typography color="white">{message.content}</Typography>
        <Typography color="white">
          {new Date(message.timestamp).toLocaleString()}
        </Typography>
      </Box>
      <MessageInfo message={message} />
    </Paper>
  );
};

export default MessageCard;
