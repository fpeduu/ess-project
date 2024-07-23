import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Card,
  CardHeader,
  Avatar,
  CardContent,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBack from "@mui/icons-material/ArrowBack"; // Importando o ícone de seta para trás
import { ReviewsModel } from "../../models/Reviews";
import { SessionService } from "../../../../shared/services/SessionService";

interface RoomDetails {
  id: string;
  roomName: string;
  name: string;
  status: boolean;
  capacity: number;
  imageUrl: string;
  occupancy_status?: boolean;
}

const RoomDetailsPage: React.FC = () => {
  const sessionManager = new SessionService();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<RoomDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [reviews, setReviews] = useState<ReviewsModel[]>([]);

  const fetchRoomReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/reviews/${id}`);

      const reviewsWithLikes = response.data.data.map((review) => {
        const likesCount = review.ratings.filter(
          (rating) => rating.liked
        ).length;
        const dislikesCount = review.ratings.filter(
          (rating) => !rating.liked
        ).length;
        return { ...review, likesCount, dislikesCount };
      });
      setReviews(reviewsWithLikes);
    } catch (error) {
      console.error("Erro ao carregar as avaliações da sala:", error);
    }
  };

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

  const handleReviewFeedback = async (review_id: string, liked: boolean) => {
    try {
      await axios.post(`http://localhost:8000/reviews/ratings`, {
        user_id: sessionManager.getUser().id,
        review_id,
        liked,
      });

      fetchRoomReviews();
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

  const formatDate = (date) => {
    const datePart = date.toLocaleDateString('pt-BR');
    const timePart = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    return `${datePart} ${timePart}`;
}

  const reserveRoom = async () => {
    try {
      const today = new Date();
      await axios.post(`http://localhost:8000/reservations/`, {
        room_id: room?.id,
        user_id: sessionManager.getUser().id,
        start_time: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate())),
        end_time: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)),
        activity: "Aula",
        teacher: "Breno"
      });
      navigate("/rooms")
    } catch (error) {
      console.error("Errro ao reservar sala", error);
    }
  }

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
          onClick={() => navigate("/admin/rooms")}
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

      {!room.occupancy_status && (
          <Button
            variant="contained"
            color="primary"
            onClick={reserveRoom}
            style={{ marginTop: "10px" }}
          >
            Reservar Sala
          </Button>
        )}

      <Box mt={4}>Avaliações</Box>

      <Box mt={2}>
        {reviews.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Nenhuma avaliação disponível.
          </Typography>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} style={{ marginBottom: "16px" }}>
              <CardHeader
                title={review.user.name}
                subheader={new Date(review.created_at!).toLocaleDateString()}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Nota: {review.rating}/5
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>
              </CardContent>
              <Box m={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: "8px" }}
                  onClick={() => handleReviewFeedback(review.id, true)}
                >
                  Útil ({review.likesCount || 0})
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleReviewFeedback(review.id, false)}
                >
                  Não útil ({review.dislikesCount || 0})
                </Button>
              </Box>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
};

export default RoomDetailsPage;
