import React, { useRef, useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../axiosConfig";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

const Login: React.FC = () => {
  const recaptcha = useRef<ReCAPTCHA | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const captchaValue = recaptcha.current?.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
      return;
    }

    if (!nickname.trim()) {
      alert("Nickname is required!");
      return;
    }

    setLoading(true);
    try {
      const verifyRes = await api.post("/verify", {
        captchaValue,
      });

      if (verifyRes.data.success) {
        const response = await api.post("/login/anonymous", {
          nickname,
        });
        const accessToken = response.data.access_token;
        setToken(accessToken);
        navigate("/");
      } else {
        alert("reCAPTCHA validation failed!");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("An error occurred during login.");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Anonymous Login
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 2,
          }}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            label="Nickname"
            variant="outlined"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            fullWidth
          />
          <ReCAPTCHA
            ref={recaptcha}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={loading}
            size="large"
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
