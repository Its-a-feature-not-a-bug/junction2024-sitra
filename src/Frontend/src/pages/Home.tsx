import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../AuthContext';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout/Logout';
import CreateConversation from '../components/CreateConversation/CreateConversation';

// Define the type for the JWT payload
interface JwtPayload {
  sub: string;
  nickname: string;
}

const Home: React.FC = () => {
  const { token } = useAuth();

  // Decode the JWT to get the nickname
  const decodedToken = token ? jwtDecode<JwtPayload>(token) : null;
  const nickname = decodedToken?.nickname;
  const navigate = useNavigate();

  return (
    <Container sx={{ padding: 2 }}>
      {nickname ? (
        <>
          <Typography variant="h5">
            Hello, {nickname}! Welcome to the app.
          </Typography>
          <Logout />
        </>
      ) : (
        <>
          <Typography variant="h3" color="white" fontWeight={500}>
            Discover new discussions and engage in converersations
          </Typography>
          <Button variant="contained" onClick={() => navigate('/login')}>
            Login
          </Button>
        </>
      )}
      <CreateConversation />
    </Container>
  );
};

export default Home;
