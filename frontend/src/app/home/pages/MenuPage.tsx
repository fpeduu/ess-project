import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Container, Card, CardContent, Grid } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const MenuPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path: string) => {
    handleClose();
    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <div>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuClick('/meus-dados')}>Meus Dados</MenuItem>
              <MenuItem onClick={() => handleMenuClick('')}>Minhas Reservas</MenuItem>
              <MenuItem onClick={() => handleMenuClick('/delete')}>Deletar Conta</MenuItem>
              <MenuItem onClick={() => handleMenuClick('/')}>Sair</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {[1, 2, 3, 4].map((index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Card {index}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Card Content
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default MenuPage;
