import React from 'react';
import DeleteUserButton from '../../components/DeleteUserButton';
import { Container, Typography, Box } from '@mui/material';

const DeleteUserPage: React.FC = () => {
  const userId = sessionStorage.getItem('userId');

  console.log('User ID from sessionStorage:', userId);

  // Verifica se o userId está definido
  if (!userId) {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Excluir Usuário
          </Typography>
          <Typography variant="body1" paragraph>
            ID do usuário não encontrado. Por favor, verifique se você está logado.
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
