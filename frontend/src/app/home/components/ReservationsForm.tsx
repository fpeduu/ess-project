import React, { useState, useEffect } from "react";
import { ReservationModel } from "../models/Reservations";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Room } from "@mui/icons-material";

const generateRandomId = () => Math.random().toString(36).substring(2, 15);

interface ReservationFormProps {
  onSubmit: (reservation: ReservationModel) => void;
  selectedReservation: ReservationModel | null;
  setSelectedReservation: React.Dispatch<
    React.SetStateAction<ReservationModel | null>
  >;
}

const ReservationsForm: React.FC<ReservationFormProps> = ({
  onSubmit,
  selectedReservation,
  setSelectedReservation,
}) => {
  const [startDate, setStartDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    if (selectedReservation) {
      setStartDate(selectedReservation.start_date.split("T")[0]);
      setStartTime(selectedReservation.start_date.split("T")[1].slice(0, 5));
      if (selectedReservation.end_date) {
        setEndDate(selectedReservation.end_date.split("T")[0]);
        setEndTime(selectedReservation.end_date.split("T")[1].slice(0, 5));
      } else {
        setEndDate("");
        setEndTime("");
      }
    } else {
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
    }
  }, [selectedReservation]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const id = selectedReservation ? selectedReservation.id : generateRandomId();
    const status = selectedReservation ? selectedReservation.status : "Waiting Approval";
    const start_date = `${startDate}T${startTime}:00`;
    const end_date = `${endDate}T${endTime}:00`;

    const room = selectedReservation ? selectedReservation.room : { name: "Default Room", status: "Available", occupancy: "1" };
    const user = selectedReservation ? selectedReservation.user : { name: "Default User", email: "default@example.com" };

    onSubmit({ id, start_date, end_date, status, room_id: "", user_id: "", room, user});
    setSelectedReservation(null);
  };

  const handleCancel = () => {
    setSelectedReservation(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Start Time"
        type="time"
        InputLabelProps={{ shrink: true }}
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="End Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="End Time"
        type="time"
        InputLabelProps={{ shrink: true }}
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {selectedReservation ? "Salvar Alterações" : "Adicionar nova reserva"}
      </Button>
      {selectedReservation && (
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

export default ReservationsForm;
