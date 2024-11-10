import { AppBar, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          padding: '20px 40px',
          display: 'flex',
          flexDirection: 'row',
          background: 'rgb(22,22,22)',
          boxShadow: 'none',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer', lineHeight: 1, fontWeight: 'bold' }}
        >
          FairVoice
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: '12px',
            padding: '8px 20px',
            background: 'white',
            color: 'black',
            textTransform: 'none',
          }}
          onClick={() => navigate('/login')}
        >
          Login
        </Button>
      </AppBar>
    </Box>
  );
};

export default Header;
