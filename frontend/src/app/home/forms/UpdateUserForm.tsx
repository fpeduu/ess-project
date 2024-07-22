import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const UpdateUserForm: React.FC = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    cpf: '',
    name: '',
    role: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      axios.get(`http://localhost:8000/users/${storedUserId}`)
        .then(response => {
          console.log('Fetched user data:', response.data);
          console.log(response.data.data.name)
          const data2 = response.data.data
          setUserData({
            email: data2.email || '',
            password: data2.password || '',
            cpf: data2.cpf || '',
            name: data2.name || '',
            role: data2.role || ''
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setError('Error fetching user data');
          setLoading(false);
        });
    } else {
      setError('User ID not found in session storage');
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      axios.put(`http://localhost:8000/users/${storedUserId}`, userData)
        .then(response => {
          setSuccessMessage('User updated successfully');
          setError(null);
        })
        .catch(error => {
          console.error('Error updating user:', error);
          setError('Error updating user');
          setSuccessMessage(null);
        });
    } else {
      setError('User ID not found in session storage');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Update User
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
          value={userData.email}
          onChange={handleChange}
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
          value={userData.password}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="cpf"
          label="CPF"
          id="cpf"
          value={userData.cpf}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="name"
          label="Name"
          id="name"
          value={userData.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="role"
          label="Role"
          id="role"
          value={userData.role}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update User
        </Button>
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
    </Container>
  );
};

export default UpdateUserForm;
