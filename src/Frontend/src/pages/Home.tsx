import React from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../AuthContext";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout/Logout";

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
    <div>
      <h1>Welcome to the Home Page</h1>
      {nickname ? (
        <Container>
          <Typography variant="h5">
            Hello, {nickname}! Welcome to the app.
          </Typography>
          <Logout />
        </Container>
      ) : (
        <Container>
          <Typography variant="h5">
            Welcome! Please login to use this app. test auto deploy
          </Typography>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Container>
      )}
    </div>
  );
};

export default Home;
