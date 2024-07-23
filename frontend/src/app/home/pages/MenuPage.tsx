import React, { useEffect } from "react";
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
import { SessionService } from "../../../shared/services/SessionService";

const MenuPage: React.FC = () => {
  const sessionManager = new SessionService();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isUserAdmin, setIsUserAdmin] = React.useState(true);
  const navigate = useNavigate();
  const [userId, setUserId] = React.useState(0);

  useEffect(() => {
    const user = sessionManager.getUser();
    if (user) {
      setIsUserAdmin(user.role === "admin");
      setUserId(user.id);
    }
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path: string) => {
    handleClose();
    if (path == "/") {
      sessionManager.clearUser();
    }
    
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
                left: "35%",
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
                data-cy="view-reservation-history"
                style={{ marginRight: 16, cursor: "pointer" }}
              >
                Histórico de Reservas
              </a>
              <a
                color="secondary"
                onClick={() => navigate("/admin/equipment")}
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
                left: "35%",
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
                Minhas reservas
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
              <MenuItem onClick={() => handleMenuClick(`/users/update`)}>
                Meus Dados
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
