import React, { useState, useEffect } from "react";
import EquipmentForm from "../../components/EquipmentForm";
import EquipmentTable from "../../components/EquipmentTable";
import { EquipmentModel } from "../../models/Equipment";
import {
  Container,
  Typography,
  Box,
  Alert,
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

const EquipmentManagerPage: React.FC = () => {
  const [equipments, setEquipments] = useState<EquipmentModel[]>([]);
  const [filteredEquipments, setFilteredEquipments] = useState<
    EquipmentModel[]
  >([]);
  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentModel | null>(null);
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
    fetchEquipments();
  }, []);

  useEffect(() => {
    let filtered = equipments;

    if (searchQuery) {
      filtered = filtered.filter(
        (equipment) =>
          equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (equipment.description &&
            equipment.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      );
    }

    if (quantityFilter && quantityFilterValue !== "") {
      filtered = filtered.filter((equipment) => {
        const amount = equipment.amount;
        const filterValue = parseInt(quantityFilterValue as string);
        if (quantityFilter === "above") {
          return amount > filterValue;
        } else if (quantityFilter === "below") {
          return amount < filterValue;
        } else if (quantityFilter === "equal") {
          return amount === filterValue;
        }
        return false;
      });
    }

    if (dateSort) {
      filtered = filtered.sort((a, b) => {
        if (dateSort === "recent") {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        } else if (dateSort === "oldest") {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        }
        return 0;
      });
    }

    setFilteredEquipments(filtered);
  }, [searchQuery, quantityFilter, quantityFilterValue, dateSort, equipments]);

  const fetchEquipments = async () => {
    try {
      const response = await axios.get("http://localhost:8000/equipment/");
      setEquipments(response.data);
    } catch (err) {
      setError("Erro ao carregar equipamentos.");
      setOpenSnackbar(true);
      console.error(err);
    }
  };

  const handleAdd = async (
    equipment: Omit<EquipmentModel, "id" | "created_at">
  ) => {
    try {
      await axios.post("http://localhost:8000/equipment/", {
        ...equipment,
        created_at: new Date().toISOString(),
      });
      fetchEquipments();
      setMessage("Equipamento adicionado com sucesso!");
      setError("");
      setSelectedEquipment(null);
      setOpenSnackbar(true);
    } catch (err) {
      setError("Erro ao adicionar equipamento.");
      setMessage("");
      setOpenSnackbar(true);
      console.error(err);
    }
  };

  const handleEdit = async (equipment: EquipmentModel) => {
    try {
      await axios.put(
        `http://localhost:8000/equipment/${equipment.id}`,
        equipment
      );
      fetchEquipments();
      setMessage("Equipamento atualizado com sucesso!");
      setError("");
      setSelectedEquipment(null);
      setOpenSnackbar(true);
    } catch (err) {
      setError("Erro ao atualizar equipamento.");
      setMessage("");
      setOpenSnackbar(true);
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/equipment/${id}`);
      fetchEquipments();
      setMessage("Equipamento removido com sucesso!");
      setError("");
      setOpenSnackbar(true);
    } catch (err) {
      setError("Erro ao remover equipamento.");
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
          Gerenciamento de Equipamentos
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box mb={4}>
          <EquipmentForm
            onSubmit={selectedEquipment ? handleEdit : handleAdd}
            selectedEquipment={selectedEquipment}
            setSelectedEquipment={setSelectedEquipment}
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
              label="Buscar Equipamentos"
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
                    <InputLabel>Filtrar por Quantidade</InputLabel>
                    <Select
                      value={quantityFilter}
                      onChange={(e) => setQuantityFilter(e.target.value)}
                      label="Filtrar por Quantidade"
                    >
                      <MenuItem value="">Nenhum</MenuItem>
                      <MenuItem value="above">Acima de</MenuItem>
                      <MenuItem value="below">Abaixo de</MenuItem>
                      <MenuItem value="equal">Igual a</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {quantityFilter && (
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      label="Valor da Quantidade"
                      variant="outlined"
                      fullWidth
                      value={quantityFilterValue}
                      onChange={(e) => setQuantityFilterValue(e.target.value)}
                      type="number"
                    />
                  </Grid>
                )}
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
              <EquipmentTable
                equipments={filteredEquipments}
                onDelete={handleDelete}
                onEdit={setSelectedEquipment}
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

export default EquipmentManagerPage;
