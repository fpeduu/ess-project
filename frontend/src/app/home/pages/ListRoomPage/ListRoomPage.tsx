import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoomCard from "../../components/RoomCard/RoomCard";

interface Room {
  id: string;
  roomName: string;
  name: string;
  status: string;
  capacity: number;
  imageUrl: string;
}

const ListRoomPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8000/rooms");
        console.log("Rooms Response:", response.data);
        setRooms(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar as salas.");
        setLoading(false);
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  const handleCreateNewRoom = () => {
    navigate("/admin/new-room"); // Navega para a página de criação de nova sala
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box my={4}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box py={4}>
        <Typography variant="h4" gutterBottom>
          Minhas Salas
        </Typography>
        <Grid container spacing={4}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <RoomCard
                id={room.id}
                roomName={room.roomName || room.name}
                status={room.status}
                capacity={room.capacity}
                imageUrl={room.imageUrl}
              />
            </Grid>
          ))}
        </Grid>
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNewRoom}
          >
            Criar Nova Sala
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ListRoomPage;
