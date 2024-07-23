import React, { useEffect } from "react";
import DeleteUserButton from "../../components/DeleteUserButton";
import { Container, Typography, Box } from "@mui/material";
import { SessionService } from "../../../../shared/services/SessionService";

const DeleteUserPage: React.FC = () => {
  const [userId, setUserId] = React.useState<string | null>(null);
  const sessionManager = new SessionService();

  useEffect(() => {
    const user = sessionManager.getUser();
    if (user) {
      setUserId(user.id);
    }
  }, []);

  if (!userId) {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Excluir Usuário
          </Typography>
          <Typography variant="body1" paragraph>
            ID do usuário não encontrado. Por favor, verifique se você está
            logado.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <DeleteUserButton userId={userId} />
      </Box>
    </Container>
  );
};

export default DeleteUserPage;
