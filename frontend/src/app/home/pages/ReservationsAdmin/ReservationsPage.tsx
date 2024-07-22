import React, { useState, useEffect } from "react";
import ReservationsTable from "../../components/ReservationsTable";
import { EquipmentModel } from "../../models/Equipment";
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
import { ReservationModel } from "../../models/Reservations";

const ReservationsManagementPage: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationModel[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<
    ReservationModel[]
  >([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [quantityFilter, setQuantityFilter] = useState<string>("");
  const [quantityFilterValue, setQuantityFilterValue] = useState<
    number | string
  >("");
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
        (equipment) =>
          equipment.room.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          equipment.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.sort((a, b) => {
      if (dateSort === "recent") {
        return (
          new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()
        );
      } else if (dateSort === "oldest") {
        return (
          new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime()
        );
      }
      return 0;
    });

    setFilteredReservations(filtered);
  }, [
    searchQuery,
    quantityFilter,
    quantityFilterValue,
    dateSort,
    reservations,
  ]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8000/reservations/");
      setReservations(response.data.data);
    } catch (err) {
      setError("Erro ao carregar equipamentos.");
      setOpenSnackbar(true);
      console.error(err);
    }
  };

  const changeReservationStatus = async (id: string, approved: boolean) => {
    try {
      await axios.put(`http://localhost:8000/reservations/${id}/`, {
        status: approved ? "Aprovada" : "Rejeitada",
      });
      setMessage("Status da reserva alterado com sucesso.");
      setOpenSnackbar(true);
      fetchReservations();
    } catch (err) {
      setError("Erro ao alterar status da reserva.");
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
          Histórico de reservas
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ mb: 2 }}></Box>
        <>
          <TextField
            label="Buscar Reservas"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Ordenar por Data</InputLabel>
                <Select
                  value={dateSort}
                  onChange={(e) => setDateSort(e.target.value)}
                  label="Ordenar por Data"
                >
                  <MenuItem value="recent">Mais Recentes</MenuItem>
                  <MenuItem value="oldest">Mais Antigos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={4}>
            <ReservationsTable
              reservations={filteredReservations}
              approveReservation={(id: string) =>
                changeReservationStatus(id, true)
              }
              rejectReservation={(id: string) =>
                changeReservationStatus(id, false)
              }
            />
          </Box>
        </>
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

export default ReservationsManagementPage;
