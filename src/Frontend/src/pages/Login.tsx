import React, { useRef, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig';
import ReCAPTCHA from 'react-google-recaptcha'

const Login: React.FC = () => {
  const recaptcha = useRef<ReCAPTCHA | null>(null)
  const [nickname, setNickname] = useState<string>('');
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const captchaValue = recaptcha.current?.getValue()
    if (!captchaValue) {
      alert('Please verify the reCAPTCHA!')
      return;
    } else {
      const res = await api.post('/verify', {
        captchaValue: captchaValue,
      });
    
      if (res.data.success) {
        // make form submission
        alert('Form submission successful!')
      } else {
        alert('reCAPTCHA validation failed!')
      }
    }



    if (!nickname.trim()) {
      alert('Nickname is required!');
      return;
    }
    try {
      const response = await api.post('/login/anonymous', {
        nickname,
      });
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
      <ReCAPTCHA ref={recaptcha} sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} />
    </div>
  );
};

export default Login;
