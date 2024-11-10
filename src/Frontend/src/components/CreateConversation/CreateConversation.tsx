import { useState } from 'react';
import { useAuth } from '../../AuthContext';
import api from '../../axiosConfig';
import {
  Button,
  css,
  Modal as BaseModal,
  styled,
  TextField,
} from '@mui/material';
import { setConversation } from '../../redux/slices/conversationSlice';
import { useDispatch } from 'react-redux';

const CreateConversation = () => {
  const [open, setOpen] = useState(false);
  const [conversationName, setConversationName] = useState('');
  const [description, setDescription] = useState('');
  const { token } = useAuth();
  const dispatch = useDispatch();

  const updateConversationList = async () => {
    const response = await api.get('/api/conversations');
    dispatch(setConversation(response.data));
  };

  const handleCreateConversation = async () => {
    if (conversationName.trim().length < 3) {
      alert('Conversation name must be at least 3 characters long');
      return;
    }
    try {
      await api.post(
        '/api/conversations',
        {
          title: conversationName.trim(),
          description: description.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConversationName('');
      setDescription('');
      setOpen(false);
      updateConversationList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{
          textTransform: 'none',
          borderRadius: '18px',
          padding: '8px 35px',
        }}
      >
        Start new conversation
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalContent>
          <h2 className="unstyled-modal-title">Create a new conversation</h2>
          <p id="unstyled-modal-description" className="modal-description">
            Type the title and start a new discussion to spark fresh ideas and
            engage the community.
          </p>
          <TextField
            value={conversationName}
            onChange={(e) => setConversationName(e.target.value)}
            label="Title"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              style: { color: grey[400] },
            }}
            InputProps={{
              style: { color: grey[50], backgroundColor: grey[800] },
            }}
            sx={{ marginBottom: 2, marginTop: 2 }}
          />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              style: { color: grey[400] },
            }}
            InputProps={{
              style: { color: grey[50], backgroundColor: grey[800] },
            }}
            sx={{ marginBottom: 2, marginTop: 2 }}
            multiline
            rows={4}
          />
          <Button onClick={handleCreateConversation} variant="contained">
            Create Conversation
          </Button>
        </ModalContent>
      </Modal>
    </div>
  );
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled('div')(
  () => css`
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${grey[900]};
    border-radius: 8px;
    border: 1px solid ${grey[700]};
    box-shadow: 0 4px 12px rgb(0 0 0 / 0.5);
    padding: 24px;
    color: ${grey[50]};
    width: calc(100vw - 120px);
    max-width: 800px;

    margin: 20px & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${grey[400]};
      margin-bottom: 4px;
    }
  `
);

export default CreateConversation;
