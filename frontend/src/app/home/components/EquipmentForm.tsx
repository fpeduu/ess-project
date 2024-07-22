import React, { useState, useEffect } from "react";
import { EquipmentModel } from "../models/Equipment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const generateRandomId = () => Math.random().toString(36).substring(2, 15);

interface EquipmentFormProps {
  onSubmit: (equipment: EquipmentModel) => void;
  selectedEquipment: EquipmentModel | null;
  setSelectedEquipment: React.Dispatch<
    React.SetStateAction<EquipmentModel | null>
  >;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({
  onSubmit,
  selectedEquipment,
  setSelectedEquipment,
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (selectedEquipment) {
      setName(selectedEquipment.name);
      setDescription(selectedEquipment.description || "");
      setAmount(selectedEquipment.amount);
    } else {
      setName("");
      setDescription("");
      setAmount(0);
    }
  }, [selectedEquipment]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const id = selectedEquipment ? selectedEquipment.id : generateRandomId(); // Gerar ID aleatório
    onSubmit({ id, name, description, amount });
    setSelectedEquipment(null);
  };

  const handleCancel = () => {
    setSelectedEquipment(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {selectedEquipment ? "Salvar Alterações" : "Adicionar Equipamento"}
      </Button>
      {selectedEquipment && (
        <Button
          fullWidth
          variant="outlined"
          onClick={handleCancel}
          sx={{ mb: 2 }}
        >
          Cancelar
        </Button>
      )}
    </Box>
  );
};

export default EquipmentForm;
