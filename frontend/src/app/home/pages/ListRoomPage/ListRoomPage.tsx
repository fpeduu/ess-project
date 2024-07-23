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
import { SessionService } from "../../../../shared/services/SessionService";

interface Room {
  id: string;
  roomName: string;
  name: string;
  status: string;
  capacity: number;
  imageUrl: string;
  occupancyStatus?: boolean;
  owner?: { email: string; name: string };
}

const ListRoomPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const sessionManager = new SessionService();

  useEffect(() => {
    const fetchRooms = async (new_rooms) => {
      try {
        const response = await axios.get("http://localhost:8000/rooms");
        if (response.data.data) {
          new_rooms = response.data.data;
        }

        return new_rooms;
      } catch (error) {
        setError("Erro ao carregar as salas.");
        throw error;
      }
    };

    const fetchStatus = async (new_rooms) => {
      try {
        const user_id = sessionManager.getUser()?.id ?? "";
        const response = await axios.get(
          "http://localhost:8000/rooms/occupancy/" + user_id
        );
        if (response.data.data) {
          const statusList = response.data.data;
          statusList.forEach((status) => {
            new_rooms.forEach((room) => {
              if (room.id == status.room_id) {
                room.occupancyStatus = status.occupancy_status;
                room.owner = status.owner;
              }
            });
          });
        }

        return new_rooms;
      } catch (error) {
        setError("Erro ao carregar os status das salas.");
        console.error(error);
      }
    };

    const fetchData = async () => {
      try {
        let newRooms = [];
        newRooms = await fetchRooms(newRooms);
        newRooms = await fetchStatus(newRooms);
        setRooms(newRooms);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCreateNewRoom = () => {
    navigate("/admin/new-room");
  };

  const isAdmin = () => {
    return sessionManager.getUser()?.role.toLowerCase() == "admin";
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
          Salas
        </Typography>
        <Grid container spacing={4}>
          {rooms.map((room) => (
            <Grid item xs={12} sm={6} md={4} key={room.id}>
              <RoomCard
                id={room.id}
                roomName={room.roomName || room.name}
                status={room.status ? true : false}
                capacity={room.capacity}
                imageUrl={room.imageUrl}
                occupancyStatus={room.occupancyStatus}
                owner={room.owner}
              />
            </Grid>
          ))}
        </Grid>
        {isAdmin() && (
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateNewRoom}
            >
              Criar Nova Sala
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ListRoomPage;
