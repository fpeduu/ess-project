import React from "react";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Sistema de Reservas
          </Typography>

          <Button color="inherit">Login</Button>
          <Button color="inherit" variant="outlined">
            Cadastrar-se
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
