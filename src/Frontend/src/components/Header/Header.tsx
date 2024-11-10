import { AppBar, Box, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, logout } = useAuth();

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
        {!token && location.pathname !== '/login' && (
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
        )}
        {token && (
          <Button
            variant="contained"
            sx={{
              borderRadius: '12px',
              padding: '8px 20px',
              background: 'white',
              color: 'black',
              textTransform: 'none',
            }}
            onClick={() => logout()}
          >
            Log out
          </Button>
        )}
      </AppBar>
    </Box>
  );
};

export default Header;
