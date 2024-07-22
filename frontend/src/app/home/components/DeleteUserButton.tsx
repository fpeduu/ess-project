import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface DeleteUserButtonProps {
  userId: string;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ userId }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const deleteUser = async () => {
    console.log('Deleting user with ID:', userId);  

    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este usuário?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8000/users/${userId}`);
        if (response.status === 200) {
          setMessage('Usuário deletado com sucesso');
          setError(null);
          sessionStorage.removeItem('userId');
          navigate('/'); // Redirecionar para a página inicial
        } else {
          setError('Erro ao deletar usuário');
          setMessage(null);
        }
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        setError('Erro ao deletar usuário');
        setMessage(null);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Deletar Usuário
        </Typography>
        <Typography variant="body1" paragraph>
          Atenção! Esta ação não pode ser desfeita. Por favor, confirme se você deseja realmente deletar este usuário.
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={deleteUser}
          sx={{ mt: 2 }}
        >
          Deletar Usuário
        </Button>
        {message && (
          <Box mt={2}>
            <Alert severity="success">{message}</Alert>
          </Box>
        )}
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default DeleteUserButton;
