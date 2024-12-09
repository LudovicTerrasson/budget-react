import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // État pour contrôler l'ouverture du Snackbar
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Vérification des champs vides
    if (!name || !password) {
      setError('Veuillez remplir tous les champs.');
      setOpenSnackbar(true); // Ouvre le Snackbar avec le message d'erreur
      return;
    }

    try {
      // Récupérer tous les utilisateurs
      const response = await fetch("http://localhost:8080/student/getAll");
      const users = await response.json();

      // Vérifier si le nom d'utilisateur existe déjà
      const userExists = users.some((user) => user.name === name);
      if (userExists) {
        setError('Ce nom d’utilisateur existe déjà. Veuillez en choisir un autre.');
        setOpenSnackbar(true); // Ouvre le Snackbar avec le message d'erreur
        return;
      }

      // Ajouter l'utilisateur
      const student = { name, password };
      await fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      });

      // Redirection vers la page de connexion
      navigate('/login');
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      setOpenSnackbar(true); // Ouvre le Snackbar avec le message d'erreur
      console.error(err);
    }
  };

  // Fonction pour fermer le Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', width: 400, margin: '20px auto' }}>
        <Typography variant="h5" gutterBottom>
          Inscription
        </Typography>
        <form onSubmit={handleSignUp}>
          <TextField
            id="name"
            label="Nom d'utilisateur"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(''); // Réinitialiser l'erreur lorsqu'un champ est modifié
            }}
          />
          <TextField
            id="password"
            label="Mot de passe"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            S'inscrire
          </Button>
        </form>
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