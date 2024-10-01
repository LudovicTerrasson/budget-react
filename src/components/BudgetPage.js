import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';

export default function BudgetPage() {
  const [totalBudget, setTotalBudget] = useState('');
  const [coursesBudget, setCoursesBudget] = useState('');
  const [housingBudget, setHousingBudget] = useState('');
  const [leisureBudget, setLeisureBudget] = useState('');
  const [subscriptionBudget, setSubscriptionBudget] = useState('');
  const [transportBudget, setTransportBudget] = useState('');
  const [savingsBudget, setSavingsBudget] = useState('');

  const handleSaveBudget = (e) => {
    e.preventDefault();
    const budget = {
      totalBudget,
      coursesBudget,
      housingBudget,
      leisureBudget,
      subscriptionBudget,
      transportBudget,
      savingsBudget,
      // Assurez-vous d'ajouter studentId ici
    };

    fetch("http://localhost:8080/budget/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budget)
    }).then(() => {
      // Gestion de la redirection ou de l'affichage d'un message
    });
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
    </Container>
  );
}

