import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack"; // Importando o ícone de seta para trás

interface RoomDetails {
  id: string;
  roomName: string;
  name: string;
  status: boolean;
  capacity: number;
  imageUrl: string;
}

const RoomDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<RoomDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/rooms/${id}`);
        const roomData = response.data.data[0];
        setRoom(roomData);
        setLoading(false);
      } catch (error) {
        setError("Erro ao carregar os detalhes da sala.");
        setLoading(false);
        console.error(error);
      }
    };

    const fetchRoomReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/reviews?room_id=${id}`
        );

        console.log(response.data.data);
        setReviews(response.data.data);
      } catch (error) {
        console.error("Erro ao carregar as avaliações da sala:", error);
      }
    };

    fetchRoomDetails();
    fetchRoomReviews();
  }, [id]);

  const toggleRoomStatus = async () => {
    if (!room) return;

    const newStatus = !room.status;

    try {
      await axios.put(`http://localhost:8000/rooms/${id}?status=${newStatus}`);
      setRoom({ ...room, status: newStatus });
    } catch (error) {
      console.error("Erro ao mudar o status da sala:", error);
    }
  };

  const deleteRoom = async () => {
    try {
      await axios.delete(`http://localhost:8000/rooms/${id}`);
      navigate("/rooms");
    } catch (error) {
      console.error("Erro ao deletar a sala:", error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
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
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Erro
          </Typography>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  if (!room) {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Sala não encontrada
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" alignItems="center" mb={4} paddingTop={1.2}>
        <Button
          onClick={() => navigate("/rooms")}
          style={{ minWidth: "auto", padding: 0 }}
        >
          <ArrowBack style={{ fontSize: 40, marginRight: 16 }} />
        </Button>
        <Typography variant="h4" component="div">
          Detalhes da Sala
        </Typography>
      </Box>
      <Box mb={4}>
        {" "}
        {/* Adicionando um espaçamento entre as informações e a imagem */}
        <Typography variant="h5" component="div">
          {room.roomName || room.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Status: {room.status ? "Disponível" : "Indisponível"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Capacidade Máxima: {room.capacity}
        </Typography>
      </Box>
      <img
        src={room.imageUrl || "https://via.placeholder.com/300"}
        alt={room.roomName}
        style={{ width: "100%" }}
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={toggleRoomStatus}>
          {room.status ? "Marcar como Indisponível" : "Marcar como Disponível"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={deleteRoom}
          style={{ marginLeft: "10px" }}
        >
          Deletar Sala
        </Button>
      </Box>

      <Box mt={4}>Avaliações</Box>
    </Container>
  );
};

export default RoomDetailsPage;
