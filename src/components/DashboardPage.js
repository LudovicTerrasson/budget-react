import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Grid, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();
  const [totals, setTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        if (user && user.id) {
          const response = await fetch(`http://localhost:8080/budget/getByStudentId/${user.id}`);
          const data = await response.json();

          console.log("Données récupérées :", data); // Vérification des données récupérées

          if (response.ok) {
            calculateTotals(data);
          } else {
            console.error("Erreur lors de la récupération des budgets :", data);
            setTotals({}); // Si erreur, on vide les totaux
          }
        }
      } catch (error) {
        console.error("Erreur de requête :", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchBudgets();
  }, [user]);

  const calculateTotals = (budget) => {
    if (budget && budget.id) {
      const totals = {
        Courses: budget.coursesBudget,
        Housing: budget.housingBudget,
        Leisure: budget.leisureBudget,
        Subscription: budget.subscriptionBudget,
        Transport: budget.transportBudget,
        Savings: budget.savingsBudget,
      };
      setTotals(totals);
    } else {
      setTotals({}); // Si aucun budget, on vide les totaux
    }
  };
  

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Budgets
        </Typography>
        {loading ? (
          <Typography variant="h6">Chargement...</Typography>
        ) : Object.keys(totals).length === 0 ? (
          <Grid container spacing={2} justifyContent="center">
            <Typography variant="h6" style={{ margin: '20px 0' }}>
              Pour utiliser cette page, veuillez d'abord définir un budget.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/budget')}>
              Aller à la page Budget
            </Button>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Détails des Budgets
              </Typography>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Catégorie</th>
                    <th style={{ border: '1px solid #ccc', padding: '8px' }}>Montant (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(totals).map(([category, amount]) => (
                    <tr key={category}>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{category}</td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
}
