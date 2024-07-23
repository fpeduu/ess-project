import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import { SessionService } from "../../../../shared/services/SessionService";

interface RoomCardProps {
  id: string;
  roomName: string;
  status: boolean;
  capacity: number;
  imageUrl: string;
  occupancyStatus?: boolean;
  owner?: {name: string, email: string}
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  roomName,
  status,
  capacity,
  imageUrl,
  occupancyStatus,
  owner
}) => {
  const sessionManager = new SessionService();
  const occupation = {
    backgroundColor: occupancyStatus ? (owner?.email == sessionManager.getUser().email ? "#ADD8E6" : "#F8C8C8") : "#A8D5BA",
  }

  const isAdmin = () => {
    return sessionManager.getUser()?.role.toLowerCase() == "admin";
  }

  return (
    <Card>
      <CardActionArea component={Link} to={`/admin/rooms/${id}`}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl || "https://via.placeholder.com/300"} // Placeholder image if imageUrl is empty
          alt={roomName}
        />
        <CardContent style={occupation}>
          <Typography variant="h5" component="div">
            {roomName}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Capacidade: {capacity}
          </Typography>

          { !occupancyStatus && (
            <Typography variant="body2" color="text.secondary">
              Status: {status ? "Disponível" : "Indisponível"}
            </Typography>
          )}

          { owner?.email == sessionManager.getUser().email && (
            <Typography variant="body2" color="text.secondary">
              Minha reserva
            </Typography>
          )}

          { (occupancyStatus && owner && owner!.email != sessionManager.getUser().email) && (
            <div>
              <Typography variant="body2" color="text.secondary">
                Reservado por: {owner?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: {owner?.email}
              </Typography>
            </div>
          )}

          { (occupancyStatus && !owner?.email) && (
            <Typography variant="body2" color="text.secondary">
              Ocupado
            </Typography>
          )}

          { (!occupancyStatus && isAdmin() && (
            <Typography variant="body2" color="text.secondary">
              &nbsp;
            </Typography>
          ))}

        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RoomCard;
