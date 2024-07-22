import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const FormNewRoom: React.FC = () => {
  const [name, setname] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [capacity, setCapacity] = useState<number | ''>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === '') {
      setCapacity('');
    } else {
      const parsedValue = parseInt(value, 10);
      if (!isNaN(parsedValue)) {
        setCapacity(parsedValue);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (!name || !status || !capacity) {
      setError('Todos os campos são obrigatórios.');
      setMessage('');
      return;
    }

    const room = {name, status, capacity };

    try {
      const response = await axios.post('http://localhost:8000/rooms/', room);
      setMessage('Sala criada com sucesso!');
      setError('');
      setname('');
      setStatus('');
      setCapacity('');
    } catch (error) {
      setError('Erro ao criar sala.');
      setMessage('');
      console.error('Erro ao criar sala:', error);
      if (error.response) {
        // A resposta do servidor foi recebida, mas indica um erro
        console.error('Detalhes do erro:', error.response.data);
        setError(`Erro ao criar sala: ${error.response.data.message || 'Erro desconhecido'}`);
      } else if (error.request) {
        // A solicitação foi feita, mas nenhuma resposta foi recebida
        console.error('Sem resposta do servidor:', error.request);
        setError('Erro ao criar sala: Sem resposta do servidor.');
      } else {
        // Algo aconteceu ao configurar a solicitação que gerou um erro
        console.error('Erro ao configurar solicitação:', error.message);
        setError(`Erro ao criar sala: ${error.message}`);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Criar uma nova sala
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nome da Sala"
          name="name"
          autoComplete="room-name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="status-label">Selecione o status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Selecione o status"
          >
            <MenuItem value={"available"}>Disponível</MenuItem>
            <MenuItem value={"unavailable"}>Indisponível</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="capacity"
          label="Capacidade Máxima"
          name="capacity"
          type="number"
          value={capacity}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Criar Sala
        </Button>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Container>
  );
};

export default FormNewRoom;
