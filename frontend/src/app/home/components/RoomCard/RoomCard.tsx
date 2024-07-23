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
    <Card data-cy={`room-card-${id}`}>
      <CardActionArea component={Link} to={`/admin/rooms/${id}`}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl || 'https://via.placeholder.com/300'}
          alt={roomName}
          data-cy={`room-card-image-${id}`} // Adicione este atributo
        />
        <CardContent data-cy={`room-card-content-${id}`}> {/* Adicione este atributo */}
          <Typography variant="h5" component="div" data-cy={`room-card-name-${id}`}>
            {roomName}
          </Typography>
          <Typography variant="body2" color="text.secondary" data-cy={`room-card-status-${id}`}>
            Status: {status ? 'Disponível' : 'Indisponível'}
          </Typography>
          <Typography variant="body2" color="text.secondary" data-cy={`room-card-capacity-${id}`}>
            Capacidade: {capacity}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RoomCard;
