import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!nickname.trim()) {
      alert('Nickname is required!');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:8000/login/anonymous',
        { nickname }
      );
      const accessToken = response.data.access_token;
      setToken(accessToken); // Store the token in AuthContext
      navigate('/'); // Redirect to the main page
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h1>Anonymous Login</h1>
      <label>
        Nickname:
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
