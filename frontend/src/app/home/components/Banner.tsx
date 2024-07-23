import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { SessionService } from "../../../shared/services/SessionService";

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const sessionManager = new SessionService();

  const handleSignup = () => {
    navigate("/users");
  };

  const handleLogin = () => {
    navigate("/login");
  }

  const isLoggedIn = () => {
    if (sessionManager.getUser()) return true;

    return false;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "50px 0",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="h3" gutterBottom>
          Bem-vindo ao Sistema de Reservas de Sala!
        </Typography>
        <Typography variant="h5" gutterBottom>
          Reserve a sala perfeita para sua reunião
        </Typography>
        
        { isLoggedIn() ? null : (
          <div className="">
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ margin: "0 10px" }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              style={{ margin: "0 10px" }}
              onClick={handleSignup}
            >
              Cadastrar-se
            </Button>
          </div>
        )}
      </Container>
    </Box>
  );
};

export default Banner;
