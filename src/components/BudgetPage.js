import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import du contexte d'authentification

export default function BudgetPage() {
  const { user } = useAuth(); 
  const [totalBudget, setTotalBudget] = useState('');
  const [coursesBudget, setCoursesBudget] = useState('');
  const [housingBudget, setHousingBudget] = useState('');
  const [leisureBudget, setLeisureBudget] = useState('');
  const [subscriptionBudget, setSubscriptionBudget] = useState('');
  const [transportBudget, setTransportBudget] = useState('');
  const [savingsBudget, setSavingsBudget] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState(''); 

  const handleSaveBudget = (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    if (!totalBudget || !coursesBudget || !housingBudget || !leisureBudget || !subscriptionBudget || !transportBudget || !savingsBudget) {
      setErrorSnackbarMessage("Tous les champs doivent être remplis.");
      setOpenSnackbar(true); // Ouvrir le Snackbar d'erreur
      return; // Ne pas procéder à l'enregistrement
    }

    // Convertir les champs en nombres
    const total = parseFloat(totalBudget) || 0;
    const courses = parseFloat(coursesBudget) || 0;
    const housing = parseFloat(housingBudget) || 0;
    const leisure = parseFloat(leisureBudget) || 0;
    const subscription = parseFloat(subscriptionBudget) || 0;
    const transport = parseFloat(transportBudget) || 0;
    const savings = parseFloat(savingsBudget) || 0;

    const sumOfBudgets = courses + housing + leisure + subscription + transport + savings;

    // Vérifier si totalBudget est égal à la somme
    if (total !== sumOfBudgets) {
      setErrorSnackbarMessage("Le budget total doit être égal à la somme des budgets des catégories.");
      setOpenSnackbar(true); // Ouvrir le Snackbar d'erreur
      return; // Ne pas procéder à l'enregistrement
    }


    const budget = {
      totalBudget,
      coursesBudget,
      housingBudget,
      leisureBudget,
      subscriptionBudget,
      transportBudget,
      savingsBudget,
      studentId: user.id 
    };

    if (coursesBudget<0 || housingBudget<0 || leisureBudget<0 || subscriptionBudget<0 || transportBudget<0 || savingsBudget<0){
      setErrorSnackbarMessage("Les budgets ne peuvent pas être négatifs.");
      setOpenSnackbar(true); // Ouvrir le Snackbar d'erreur
      return; // Ne pas procéder à l'enregistrement
    }

    fetch("http://localhost:8080/budget/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budget)
    }).then(() => {
      console.log("Budget enregistré avec succès");
      setOpenSnackbar(true); // Ouvrir le Snackbar de succès
      setErrorSnackbarMessage(''); // Réinitialiser le message d'erreur
    }).catch(error => {
      console.error("Erreur lors de l'enregistrement du budget :", error);
    });
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
        <form onSubmit={handleSaveBudget}>
          <TextField
            label="Budget Total"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Budget Courses"
            value={coursesBudget}
            onChange={(e) => setCoursesBudget(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Budget Logement"
            value={housingBudget}
            onChange={(e) => setHousingBudget(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Budget Loisirs"
            value={leisureBudget}
            onChange={(e) => setLeisureBudget(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Budget Abonnement"
            value={subscriptionBudget}
            onChange={(e) => setSubscriptionBudget(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Budget Transport"
            value={transportBudget}
            onChange={(e) => setTransportBudget(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Budget Epargne"
            value={savingsBudget}
            onChange={(e) => setSavingsBudget(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Enregistrer le budget
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
