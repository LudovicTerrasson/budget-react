import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Snackbar, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import du contexte d'authentification
import { useNavigate } from 'react-router-dom';

export default function AddOperationPage() {
  const { user } = useAuth(); // Récupération de l'utilisateur connecté
  const [name, setNameOp] = useState('');
  const [montantOp, setMontantOp] = useState('');
  const [typeOp, setTypeOp] = useState('');
  const [categorie, setCategoryOp] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState(''); 
  const navigate = useNavigate();

  const handleAddOperation = (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    if (!name || !montantOp || !typeOp || !categorie) {
      setErrorSnackbarMessage("Tous les champs doivent être remplis.");
      setOpenSnackbar(true); // Ouvrir le Snackbar d'erreur
      return; // Ne pas procéder à l'enregistrement
    }

    // Convertir le champ en nombre
    const montant = parseFloat(montantOp) || 0;

    
      
    const operation = {
      categorie,
      montant,
      name,
      studentId: user.id, 
    };
    console.log(operation);

    console.log(operation,typeOp)

    if (typeOp === "recette"){
        fetch("http://localhost:8080/recette/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(operation)
        }).then(() => {
        console.log("Recette enregistrée avec succès");
        setOpenSnackbar(true); // Ouvrir le Snackbar de succès
        setErrorSnackbarMessage(''); // Réinitialiser le message d'erreur
        navigate('/expenses');
        }).catch(error => {
        console.error("Erreur lors de l'enregistrement de la recette :", error);
        });
      }
      else{
        fetch("http://localhost:8080/depense/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(operation)
        }).then(() => {
        console.log("Dépense enregistrée avec succès");
        setOpenSnackbar(true); // Ouvrir le Snackbar de succès
        setErrorSnackbarMessage(''); // Réinitialiser le message d'erreur
        navigate('/expenses');
        }).catch(error => {
        console.error("Erreur lors de l'enregistrement de la dépense :", error);
        });
    }
  };

  const categories = [
    { value: 'coursesBudget', label: 'Course' },
    { value: 'housingBudget', label: 'Logement' },
    { value: 'leisureBudget', label: 'Loisirs' },
    { value: 'subscriptionBudget', label: 'Abonnement' },
    { value: 'transportBudget', label: 'Transport' },
    { value: 'savingsBudget', label: 'Epargne' }
  ];

  const types = [
      { value: 'recette', label: 'Recette' },
      { value: 'depense', label: 'Dépense' }
      ];

  // Fonction pour gérer le changement de sélection
  const handleCategoryChange = (event) => {
      setCategoryOp(event.target.value);
  };

  const handleTypeChange = (event) => {
      setTypeOp(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Fermer le Snackbar
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Définir l'opération
        </Typography>
        <form onSubmit={handleAddOperation}>
          <TextField
            label="Nom de l'opération"
            value={name}
            onChange={(e) => setNameOp(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Montant"
            value={montantOp}
            onChange={(e) => setMontantOp(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="type-label">Type de l'opération</InputLabel>
            <Select
              labelId="type-label"
              value={typeOp}
              onChange={handleTypeChange}
              label="Type de l'opération"
            >
              {types.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="categorie-label">Catégorie de l'opération</InputLabel>
            <Select
              labelId="categorie-label"
              value={categorie}
              onChange={handleCategoryChange}
              label="Catégorie de l'opération"
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Enregistrer l'opération
          </Button>
        </form>
      </Paper>

      {/* Snackbar de succès */}
      <Snackbar
        open={openSnackbar && !errorSnackbarMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Opération enregistré avec succès !"
      />

      {/* Snackbar d'erreur */}
      <Snackbar
        open={openSnackbar && errorSnackbarMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={errorSnackbarMessage}
      />
    </Container>
  );
}
