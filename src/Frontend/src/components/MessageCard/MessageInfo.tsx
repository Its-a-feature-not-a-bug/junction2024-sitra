import {
  Box,
  IconButton,
  LinearProgress,
  Modal,
  Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { Message } from '../../interfaces/message';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100vw - 100px)',
  maxWidth: 800,
  bgcolor: 'rgb(50,50,50)',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MessageInfo = ({ message }: { message: Message }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <InfoIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Message Info
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', mt: 1 }}>
            <b>Message:</b> {message.content}
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', mt: 1 }}>
            <b>Anger score:</b> {message.anger_score}%
          </Typography>
          <LinearProgress variant="determinate" value={message.anger_score} />
          <Typography variant="body1" sx={{ color: 'white', mt: 1 }}>
            <b>Emotional intensity:</b> {message.emotional_intensity_score}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={message.emotional_intensity_score}
          />
          <Typography variant="body1" sx={{ color: 'white', mt: 1 }}>
            <b>Bias score:</b> {message.bias_score}%
          </Typography>
          <LinearProgress variant="determinate" value={message.bias_score} />
          <Typography variant="body1" sx={{ color: 'white', mt: 1 }}>
            <b>Reasoning of the scores:</b> {message.score_reason}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MessageInfo;
