import React, { useState, useEffect } from "react";
import { EquipmentModel } from "../models/Equipment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface EditEquipmentFormProps {
  equipment: EquipmentModel;
  onSubmit: (equipment: EquipmentModel) => Promise<void>; // Atualize para Promise<void> se for assíncrono
}

const EditEquipmentForm: React.FC<EditEquipmentFormProps> = ({
  equipment,
  onSubmit,
}) => {
  const [name, setName] = useState<string>(equipment.name);
  const [description, setDescription] = useState<string>(
    equipment.description || ""
  );
  const [amount, setAmount] = useState<number>(equipment.amount);

  useEffect(() => {
    setName(equipment.name);
    setDescription(equipment.description || "");
    setAmount(equipment.amount);
  }, [equipment]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit({ ...equipment, name, description, amount });
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
        Save Changes
      </Button>
    </Box>
  );
};

export default EditEquipmentForm;
