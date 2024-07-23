import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Button,
  Container,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const MenuPage: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isUserAdmin, setIsUserAdmin] = React.useState(true);
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
    <Box sx={{ flexGrow: 1 }} position="relative">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>

          {isUserAdmin ? (
            <Box
              style={{
                display: "flex",
                position: "absolute",
                alignSelf: "center",
                justifySelf: "center",
                left: "30%",
              }}
            >
              <a
                color="secondary"
                onClick={() => navigate("/admin/rooms")}
                style={{ marginRight: 16, cursor: "pointer" }}
              >
                Salas
              </a>
              <a
                color="secondary"
                onClick={() => navigate("/admin/reservations")}
                style={{ marginRight: 16, cursor: "pointer" }}
              >
                Histórico de Reservas
              </a>
              <a
                color="secondary"
                onClick={() => navigate("/equipment")}
                style={{ marginRight: 16, cursor: "pointer" }}
              >
                Equipamentos
              </a>
            </Box>
          ) : (
            <Box
              style={{
                display: "flex",
                position: "absolute",
                alignSelf: "center",
                justifySelf: "center",
                left: "30%",
              }}
            >
              <a
                color="secondary"
                onClick={() => navigate("/admin/rooms")}
                style={{ marginRight: 16, cursor: "pointer" }}
              >
                Salas
              </a>
              <a
                color="secondary"
                onClick={() => navigate("/admin/reservations")}
                style={{ marginRight: 16, cursor: "pointer" }}
              >
                Histórico de Reservas
              </a>
              <a
                color="secondary"
                onClick={() => navigate("/equipment")}
                style={{ marginRight: 16, cursor: "pointer" }}
              >
                Equipamentos
              </a>
            </Box>
          )}

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
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuClick("/meus-dados")}>
                Meus Dados
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/minhas-reservas")}>
                Minhas Reservas
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/delete")}>
                Deletar Conta
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick("/")}>Sair</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuPage;
