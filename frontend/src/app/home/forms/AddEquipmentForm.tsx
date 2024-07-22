// forms/AddEquipmentForm.tsx
import React from "react";
import axios from "axios";
import { EquipmentModel } from "../models/Equipment";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import EquipmentForm from "../components/EquipmentForm";

const AddEquipmentForm: React.FC = () => {
  const handleSubmit = async (equipment: EquipmentModel) => {
    try {
      await axios.post("http://localhost:8000/equipment/", equipment);
    } catch (error) {
      console.error("Erro ao criar equipamento:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Cadastre Equipamento
      </Typography>
      <EquipmentForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default AddEquipmentForm;
