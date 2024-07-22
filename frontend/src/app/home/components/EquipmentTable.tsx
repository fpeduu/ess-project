import React from "react";
import { EquipmentModel } from "../models/Equipment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface EquipmentTableProps {
  equipments: EquipmentModel[];
  onDelete: (id: string) => void;
  onEdit: (equipment: EquipmentModel) => void;
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({
  equipments,
  onDelete,
  onEdit,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Criado em</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {equipments.map((equipment) => (
            <TableRow key={equipment.id}>
              <TableCell>{equipment.name}</TableCell>
              <TableCell>{equipment.description}</TableCell>
              <TableCell>{equipment.amount}</TableCell>
              <TableCell>
                {new Date(equipment.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(equipment)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(equipment.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EquipmentTable;
