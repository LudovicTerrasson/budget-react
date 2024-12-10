import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, TextField, Button, Container, Paper,Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

 

  const checkLogin = async (e) => {
    e.preventDefault();

    try {
        // Appel à l'API back-end
        const response = await fetch('http://localhost:8080/student/validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        });
        console.log(JSON.stringify({ name, password }));

        // Lecture de la réponse JSON
        const isValid = await response.json();
        console.log(isValid);
        // Mise à jour de l'état en fonction de la réponse
        if (isValid) {
          handleLogin(e);
        } else {
          setError('Nom d’utilisateur ou mot de passe incorrect.');
          setOpenSnackbar(true);
        }
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        setError('Erreur serveur. Veuillez réessayer.');
        setOpenSnackbar(true);
    }
};

const handleLogin = (e) => {
  e.preventDefault();

  // Vérification si l'un des champs est vide
  if (!name || !password) {
    setError('Veuillez remplir tous les champs.');
    setOpenSnackbar(true);
    return;
  }

  fetch('http://localhost:8080/student/getAll')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const user = data.find((u) => u.name === name);
      console.log(user);
      if (user) {
        login(user);
        navigate('/');
      } else {
        setError('Nom d’utilisateur ou mot de passe incorrect.');
        setOpenSnackbar(true);
      }
    })
    .catch(() => {
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      setOpenSnackbar(true);
    });
};

  // Fonction pour fermer le Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
            onChange={(e) => {
              setName(e.target.value);
              setError(''); // Réinitialiser l'erreur lorsque l'utilisateur tape
            }}
          />
          <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(''); // Réinitialiser l'erreur lorsque l'utilisateur tape
            }}
          />
          <Button variant="contained" color="primary" onClick={checkLogin}>
            Connexion
          </Button>
        </Box>
      </Paper>

      {/* Snackbar pour afficher les erreurs */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </Container>
  );
}