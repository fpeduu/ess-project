import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { ReservationModel } from "../models/Reservations";

interface ReservationTableProps {
  reservations: ReservationModel[];
  approveReservation: (id: string) => void;
  rejectReservation: (id: string) => void;
}

const ReservationTable: React.FC<ReservationTableProps> = ({
  reservations,
  approveReservation,
  rejectReservation,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome da sala</TableCell>
            <TableCell>Nome do usuário</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Data inicial</TableCell>
            <TableCell>Data final</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.length > 0 &&
            reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>{reservation.room.name}</TableCell>
                <TableCell>{reservation.user.name}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>
                  {new Date(reservation.start_date).toLocaleDateString()} -{" "}
                  {new Date(reservation.start_date).toLocaleTimeString()}
                </TableCell>
                <TableCell>
                  {new Date(reservation.end_date).toLocaleDateString()} -{" "}
                  {new Date(reservation.end_date).toLocaleTimeString()}
                </TableCell>
                <TableCell style={{ display: "flex" }}>
                  <IconButton
                    onClick={() => approveReservation(reservation.id)}
                  >
                    <DoneIcon />
                  </IconButton>
                  <IconButton onClick={() => rejectReservation(reservation.id)}>
                    <CloseIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReservationTable;
