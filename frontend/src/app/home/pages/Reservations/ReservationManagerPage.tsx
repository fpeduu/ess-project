import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Snackbar,
} from "@mui/material";
import ReservationList from "../../components/ReservationsList";
import ReservationForm from "../../components/ReservationsForm";
import { ReservationModel } from "../../models/Reservations";

const ReservationPage: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationModel[]>([]);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationModel | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8000/reservations/");
      setReservations(response.data);
    } catch (err) {
      setError("Erro ao carregar reservas.");
      setOpenSnackbar(true);
      console.error(err);
    }
  };

  const handleAdd = async (
    reservation: Omit<ReservationModel, "id" | "created_at">
  ) => {
    try {
      await axios.post("http://localhost:8000/reservations/", {
        ...reservation,
        created_at: new Date().toISOString(),
      });
      fetchReservations();
      setMessage("Reserva adicionada com sucesso!");
      setError("");
      setSelectedReservation(null);
      setOpenSnackbar(true);
    } catch (err) {
      setError("Erro ao adicionar reserva.");
      setMessage("");
      setOpenSnackbar(true);
      console.error(err);
    }
  };

  const handleEdit = async (reservation: ReservationModel) => {
    try {
      await axios.put(
        `http://localhost:8000/reservations/${reservation.id}`,
        reservation
      );
      fetchReservations();
      setMessage("Reserva atualizada com sucesso!");
      setError("");
      setSelectedReservation(null);
      setOpenSnackbar(true);
    } catch (err) {
      setError("Erro ao atualizar reserva.");
      setMessage("");
      setOpenSnackbar(true);
      console.error(err);
    }
  };

  const handleDelete = async (reservation: ReservationModel) => {
    try {
      await axios.delete(`http://localhost:8000/reservations/${reservation.id}`);
      fetchReservations();
      setMessage("Reserva removida com sucesso!");
      setError("");
      setOpenSnackbar(true);
    } catch (err) {
      setError("Erro ao remover reserva.");
      setMessage("");
      setOpenSnackbar(true);
      console.error(err);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gerenciamento de Reservas
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box mb={4}>
          <ReservationForm
            onSubmit={selectedReservation ? handleEdit : handleAdd}
            selectedReservation={selectedReservation}
            setSelectedReservation={setSelectedReservation}
          />
        </Box>
        {/* <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setShowList(!showList)}
            sx={{ mr: 2 }}
          >
            {showList ? "Esconder Lista" : "Mostrar Lista"}
          </Button>
        </Box>
        {showList && (
          <Box mt={4}>
            <ReservationList
              reservations={reservations}
              onDelete={handleDelete}
              onEdit={setSelectedReservation}
            />
          </Box>
        )} */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={message || error}
          action={
            <Button color="inherit" size="small" onClick={handleCloseSnackbar}>
              Fechar
            </Button>
          }
        />
      </Paper>
    </Container>
  );
};

export default ReservationPage;
