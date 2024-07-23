import React from "react";
import { ReservationModel } from "../models/Reservations";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ReservationListProps {
  reservations: ReservationModel[];
  onDelete: (reservation: ReservationModel) => void;
  onEdit: (reservation: ReservationModel) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
  onDelete,
  onEdit,
}) => {
        const reservationsArray = Object.values(reservations);
        if (!Array.isArray(reservationsArray)) {
          return <p>Não há reservas disponíveis.</p>;
        }


  return (
    <Box>
      <Paper elevation={3}>
        <List>
          {reservationsArray.map((reservation) => (
            <ListItem key={reservation.id} sx={{ borderBottom: "1px solid #ccc" }}>
              <ListItemText
                primary={`Reserva ID: ${reservation.id}`}
                secondary={`Início: ${new Date(reservation.start_date).toLocaleString()}, Fim: ${new Date(reservation.end_date).toLocaleString()}`}
              />
              <IconButton edge="end" aria-label="edit" onClick={() => onEdit(reservation)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => onDelete(reservation)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ReservationList;
