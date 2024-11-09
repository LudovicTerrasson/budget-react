import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import du contexte d'authentification

export default function BudgetPage() {
  const { user } = useAuth(); // Récupération de l'utilisateur connecté
  const [nameOp, setNameOp] = useState('');
  const [montantOp, setMontantOp] = useState('');
  const [typeOp, setTypeOp] = useState('');
  const [categoryOp, setCategoryOp] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // État pour gérer la Snackbar
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState(''); // État pour le message d'erreur

  const handleAddOperation = (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    if (!nameOp || !montantOp || !typeOp || !tategoryOp) {
      setErrorSnackbarMessage("Tous les champs doivent être remplis.");
      setOpenSnackbar(true); // Ouvrir le Snackbar d'erreur
      return; // Ne pas procéder à l'enregistrement
    }

    // Convertir les champs en nombres
    const montantOp = parseFloat(montantOp) || 0;

    const categories = [
        { value: 'courses', label: 'Course' },
        { value: 'housing', label: 'Logement' },
        { value: 'leisure', label: 'Loisirs' },
        { value: 'subscription', label: 'Abonnement' },
        { value: 'transport', label: 'Transport' },
        { value: 'savings', label: 'Epargne' }
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


    const operation = {
      nameOperation: nameOp,
      montantOperation: montantOp,
      typeOperation: typeOp,
      categoryOperation: categoryOp,
      studentId: user.id // Ajout de l'ID de l'utilisateur
    };

    if (typeOp == 'Recette'){
        fetch("http://localhost:8080/recette/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(operation)
        }).then(() => {
        console.log("Recette enregistrée avec succès");
        setOpenSnackbar(true); // Ouvrir le Snackbar de succès
        setErrorSnackbarMessage(''); // Réinitialiser le message d'erreur
        }).catch(error => {
        console.error("Erreur lors de l'enregistrement de la recette :", error);
        });
    }else{
        fetch("http://localhost:8080/depense/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(operation)
        }).then(() => {
        console.log("Dépense enregistrée avec succès");
        setOpenSnackbar(true); // Ouvrir le Snackbar de succès
        setErrorSnackbarMessage(''); // Réinitialiser le message d'erreur
        }).catch(error => {
        console.error("Erreur lors de l'enregistrement de la dépense :", error);
        });
    }

    
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Fermer le Snackbar
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Définir le budget
        </Typography>
        <form onSubmit={handleAddOperation}>
          <TextField
            label="Nom de l'opération"
            value={nameOp}
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
          <label>
            Sélectionnez le type de la transaction:
            <select value={typeOp} onChange={handleTypeChange}>
            <option value="">-- Choisissez un type --</option>
            {types.map((type) => (
                <option key={type.value} value={type.value}>
                {type.label}
                </option>
            ))}
            </select>
          </label>
          <label>
            Sélectionnez la catégorie de la transaction:
            <select value={categoryOp} onChange={handleCategoryChange}>
            <option value="">-- Choisissez une catégorie --</option>
            {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                {cat.label}
                </option>
            ))}
            </select>
          </label>
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
        message="Budget enregistré avec succès !"
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
