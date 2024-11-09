import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../AuthContext';

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

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {nickname ? (
        <p>Hello, {nickname}! Welcome to the app.</p>
      ) : (
        <p>Welcome, anonymous user!</p>
      )}
    </div>
  );
};

export default Home;
