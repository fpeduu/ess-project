import React, { useState } from 'react';
import axios from 'axios';
import { User } from '../models/User';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const AddUserForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = { email, password, cpf, name, role };
    try {
      const response = await axios.post('http://localhost:8000/users/', user);
      setMessage('Usuário criado com sucesso!');
      setError('');
      setEmail('');
      setPassword('');
      setCpf('');
      setName('');
      setRole('');
    } catch (error) {
      setError('Error creating user.');
      setMessage('');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Cadastre-se
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="cpf"
          label="CPF"
          id="cpf"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="name"
          label="Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="role"
          label="Role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Salvar
        </Button>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Container>
  );
};

export default AddUserForm;
