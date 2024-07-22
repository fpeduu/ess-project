import React from "react";
import { EquipmentModel } from "../models/Equipment";
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

interface EquipmentListProps {
  equipments: EquipmentModel[];
  onDelete: (id: string) => void;
  onEdit: (equipment: EquipmentModel) => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({
  equipments,
  onDelete,
  onEdit,
}) => {
  return (
    <Box>
      <Paper elevation={3}>
        <List>
          {equipments.map((equipment) => (
            <ListItem
              key={equipment.id}
              sx={{ borderBottom: "1px solid #ccc" }}
            >
              <ListItemText
                primary={equipment.name}
                secondary={`Descrição: ${
                  equipment.description || "N/A"
                }, Quantidade: ${equipment.amount}`}
              />
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => onEdit(equipment)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => onDelete(equipment.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default EquipmentList;
