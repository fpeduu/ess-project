import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { SessionService } from "../../../shared/services/SessionService";

const Header: React.FC = () => {
  const sessionManager = new SessionService();

  const isLoggedIn = () => {
    if (sessionManager.getUser()) return true;

    return false;
  }

  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Sistema de Reservas
          </Typography>

          { isLoggedIn() ? null : (
            <div>
              <Button color="inherit">Login</Button>
              <Button color="inherit" variant="outlined">
                Cadastrar-se
              </Button>
            </div>
          )}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
