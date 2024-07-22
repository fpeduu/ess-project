import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {

  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/users');
  };

  const handleLogin = () => {
    const userId = '2d79a30a'; 
    sessionStorage.setItem('userId', userId);
    navigate('/menu');
  };
  
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Sistema de Reservas
          </Typography>
          
          <Button color="inherit" onClick={handleLogin}>Login</Button>
          <Button color="inherit" variant="outlined" onClick={handleSignup}>
            Cadastrar-se
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
