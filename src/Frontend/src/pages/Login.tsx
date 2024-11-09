import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import ReCAPTCHA from 'react-google-recaptcha'

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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login/anonymous`, { nickname });
      // const response = await axios.post('http://localhost:8000/login/anonymous', { nickname });
      const accessToken = response.data.access_token;
      setToken(accessToken); // Store the token in AuthContext
      navigate('/'); // Redirect to the main page
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  console.log("sitekey", import.meta.env.VITE_RECAPTCHA_SITE_KEY)

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
      <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} />
    </div>
  );
};

export default Login;
