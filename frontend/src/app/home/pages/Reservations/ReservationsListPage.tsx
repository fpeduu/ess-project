import React, { useState, useEffect } from "react";
import ReservationForm from "../../components/ReservationsForm";
import ReservationTable from "../../components/ReservationsTable";
import { ReservationModel } from "../../models/Reservations";
import {
  Container,
  Typography,
  Box,
  Snackbar,
  Paper,
  Button,
  Divider,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Collapse,
} from "@mui/material";
import axios from "axios";

const ReservationManagerPage: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationModel[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<
    ReservationModel[]
  >([]);
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationModel | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateSort, setDateSort] = useState<string>("");
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    let filtered = reservations;

    if (searchQuery) {
      filtered = filtered.filter(
        (reservation) =>
          reservation.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
          reservation.user.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (dateSort) {
      filtered = filtered.sort((a, b) => {
        if (dateSort === "recent") {
          return (
            new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
          );
        } else if (dateSort === "oldest") {
          return (
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
          );
        }
        return 0;
      });
    }

    setFilteredReservations(filtered);
  }, [searchQuery, dateSort, reservations]);

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

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/reservations/${id}`);
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
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            onClick={() => setShowList(!showList)}
            sx={{ mr: 2 }}
          >
            {showList ? "Esconder Lista" : "Mostrar Lista"}
          </Button>
          {showList && (
            <Button
              variant="contained"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? "Ocultar Filtros" : "Mostrar Filtros"}
            </Button>
          )}
        </Box>
        {showList && (
          <>
            <TextField
              label="Buscar Reservas"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Collapse in={filtersOpen} sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Ordenar por Data</InputLabel>
                    <Select
                      value={dateSort}
                      onChange={(e) => setDateSort(e.target.value)}
                      label="Ordenar por Data"
                    >
                      <MenuItem value="">Nenhum</MenuItem>
                      <MenuItem value="recent">Mais Recentes</MenuItem>
                      <MenuItem value="oldest">Mais Antigos</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Collapse>
            <Box mt={4}>
              <ReservationTable
                reservations={filteredReservations}
                onDelete={handleDelete}
                onEdit={setSelectedReservation}
              />
            </Box>
          </>
        )}
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

export default ReservationManagerPage;
