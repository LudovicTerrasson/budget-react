import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, TextField, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/student/getAll')
      .then((response) => response.json())
      .then((data) => {
        const user = data.find((u) => u.name === name && u.password === password);
        if (user) {
          login(user);
          navigate('/');
        } else {
          setError('Nom d’utilisateur ou mot de passe incorrect.');
        }
      });
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <h2>Connexion</h2>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Nom d'utilisateur"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Connexion
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
