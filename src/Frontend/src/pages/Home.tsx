import React from "react";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../AuthContext";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout/Logout";
import CreateConversation from "../components/CreateConversation/CreateConversation";
import Conversations from "../components/Conversations/Conversations";

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
          <Box
            sx={{
              marginTop: 5,
              marginBottom: 5,
              display: "flex",
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Box>
              <Typography
                variant="h3"
                color="white"
                fontWeight={500}
                sx={{ marginTop: 3 }}
                fontSize={42}
                marginBottom={4}
              >
                Discover New Discussions Fully Anonymously
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  borderRadius: "18px",
                  padding: "8px 35px",
                  textTransform: "none",
                }}
              >
                Login anonymously
              </Button>
            </Box>
            <Paper
              component="img"
              src="/img/people.webp"
              alt="People"
              sx={{ flexGrow: 1, width: "50%" }}
            />
          </Box>
        </>
      )}
      <CreateConversation />
      <Conversations />
    </Container>
  );
};

export default Home;
