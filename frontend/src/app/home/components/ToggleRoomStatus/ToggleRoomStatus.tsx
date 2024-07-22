import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, Alert } from '@mui/material';

const ToggleRoomStatusButton: React.FC<{ roomId: string }> = ({ roomId }) => {
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Buscar o status atual da sala ao carregar o componente
    const fetchRoomStatus = async () => {
      try {
        const response = await axios.put(`http://localhost:8000/rooms/${roomId}`);
        setStatus(response.data.status);
      } catch (error) {
        setError('Erro ao buscar o status da sala.');
      }
    };

    fetchRoomStatus();
  }, [roomId]);

  const toggleStatus = async () => {
    const newStatus = status === 'available' ? 'unavailable' : 'available';

    try {
      await axios.patch(`http://localhost:8000/rooms/${roomId}`, { status: newStatus });
      setStatus(newStatus);
      setMessage(`Status da sala atualizado para ${newStatus === 'available' ? 'Disponível' : 'Indisponível'}.`);
      setError('');
    } catch (error) {
      setError('Erro ao atualizar o status da sala.');
      setMessage('');
    }
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={toggleStatus}>
        {status === 'available' ? 'Tornar Indisponível' : 'Tornar Disponível'}
      </Button>
      {message && <Alert severity="success">{message}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

const ToggleRoomStatusPage: React.FC = () => {
  const roomId = sessionStorage.getItem('roomId');

  console.log('Room ID from sessionStorage:', roomId);

  if (!roomId) {
    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Alterar Status da Sala
          </Typography>
          <Typography variant="body1" paragraph>
            ID da sala não encontrado. Por favor, verifique se você está logado.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Alterar Status da Sala
        </Typography>
        <ToggleRoomStatusButton roomId={roomId} />
      </Box>
    </Container>
  );
};

export default ToggleRoomStatusPage;
