import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";

interface RoomCardProps {
  id: string;
  roomName: string;
  status: boolean;
  capacity: number;
  imageUrl: string;
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  roomName,
  status,
  capacity,
  imageUrl,
}) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/admin/rooms/${id}`}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl || "https://via.placeholder.com/300"} // Placeholder image if imageUrl is empty
          alt={roomName}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {roomName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: {status ? "Disponível" : "Indisponível"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Capacidade: {capacity}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RoomCard;
