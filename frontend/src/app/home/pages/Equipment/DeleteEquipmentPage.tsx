import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Button, Box } from "@mui/material";

const DeleteEquipmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/equipment/${id}`);
      navigate("/equipment"); // Redirect back to equipment list
    } catch (error) {
      console.error("Failed to delete equipment", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Confirmar Exclusão
      </Typography>
      <Box mb={2}>
        <Typography variant="h6">
          Tem certeza de que deseja excluir o equipamento com ID: {id}?
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={() => navigate("/equipment")}
        >
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default DeleteEquipmentPage;
