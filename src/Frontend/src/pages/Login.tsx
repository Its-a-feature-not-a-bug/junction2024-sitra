import React, { useEffect, useRef, useState } from "react";
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
} from "@mui/material";

const Login: React.FC = () => {
  const recaptcha = useRef<ReCAPTCHA | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { setToken, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

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
        <Box
          component="img"
          src="/img/anonymity.png"
          alt="Anonymity Icon"
          sx={{
            width: 100,
            height: 100,
            display: "block",
            margin: "0 auto 2px auto",
          }}
        />
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 500 }}
        >
          Anonymous Login
        </Typography>
        <Typography align="center">
          Anonymous login reduces entry barriers, enhancing user engagement and
          privacy.
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: 4,
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
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
