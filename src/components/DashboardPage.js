import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Grid, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';


export default function DashboardPage() {
  const { user } = useAuth();
  const [totalsBudget, setTotalsBudget] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [expensesByCategory, setExpensesByCategory] = useState({});


  useEffect(() => {
    const fetchBudgetsAndExpenses = async () => {
      try {
        if (user && user.id) {
          const response = await fetch(`http://localhost:8080/budget/getByStudentId/${user.id}`);
          const data = await response.json();

          console.log("Données récupérées :", data); // Vérification des données récupérées
            
          if (response.ok) {
            calculateTotalsBudget(data);
          } else {
            console.error("Erreur lors de la récupération des budgets :", data);
            setTotalsBudget({}); // Si erreur, on vide les totaux
          }

          // Récupération des dépenses
          const responseDepenses = await fetch(`http://localhost:8080/depense/getDepense/${user.id}`);
          const dataDepenses = await responseDepenses.json();
          console.log(dataDepenses);

          if (responseDepenses.ok) {
            calculateExpensesByCategory(dataDepenses); // Calculer les totaux des dépenses par catégorie
          } else {
            console.error("Erreur lors de la récupération des dépenses :", dataDepenses);
            setExpensesByCategory({}); // Vider les dépenses par catégorie si erreur
          }
        }
      } catch (error) {
        console.error("Erreur de requête :", error);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchBudgetsAndExpenses();
  }, [user]);

  const calculateTotalsBudget = (budget) => {
    if (budget && budget.id) {
      const totalsBudget = {
        Courses: budget.coursesBudget,
        Housing: budget.housingBudget,
        Leisure: budget.leisureBudget,
        Subscription: budget.subscriptionBudget,
        Transport: budget.transportBudget,
        Savings: budget.savingsBudget,
      };
      setTotalsBudget(totalsBudget);
    } else {
      setTotalsBudget({}); // Si aucun budget, on vide les totaux
    }
  };

  const calculateExpensesByCategory = (expenses) => {
    // Initialiser les catégories avec des montants à 0
    const sumsByCategory = {
        Courses: 0,
        Housing: 0,
        Leisure: 0,
        Subscription: 0,
        Transport: 0,
        Savings: 0,
    };

    expenses.forEach((expense) => {
        switch (expense.categorie) {
            case 'coursesBudget':
                sumsByCategory.Courses += expense.montant;
                break;
            case 'housingBudget':
                sumsByCategory.Housing += expense.montant;
                break;
            case 'leisureBudget':
                sumsByCategory.Leisure += expense.montant;
                break;
            case 'subscriptionBudget':
                sumsByCategory.Subscription += expense.montant;
                break;
            case 'transportBudget':
                sumsByCategory.Transport += expense.montant;
                break;
            case 'savingsBudget':
                sumsByCategory.Savings += expense.montant;
                break;
            default:
                // On pourrait gérer les catégories non prises en charge ici si besoin
                break;
        }
    });
    setExpensesByCategory(sumsByCategory);
  };

  

  // Préparer les données pour le BarChart
  const categories = Object.keys(totalsBudget);
  const budgets = categories.map((category) => totalsBudget[category] || 0); // Les montants de budget par catégorie
  const expenses = categories.map((category) => expensesByCategory[category] || 0); // Les montants de dépenses par catégorie


  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Dashboard Budgets
        </Typography>
        {loading ? (
          <Typography variant="h6">Chargement...</Typography>
        ) : Object.keys(totalsBudget).length === 0 ? (
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
                  {Object.entries(totalsBudget).map(([category, amount]) => (
                    <tr key={category}>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{category}</td>
                      <td style={{ border: '1px solid #ccc', padding: '8px' }}>{amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Grid>

            {/* Section pour le BarChart */}
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                Avancée des dépenses par catégorie
              </Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', data: categories }]}// Catégories en axe X
                yAxis={[
                  {
                    label: 'Montant (€)', 
                  }
                ]}
                series={[
                  { name: 'Dépenses', data: expenses, color: '#82ca9d', label: 'Depense' }, // Série des dépenses
                  { name: 'Budget', data: budgets, color: '#8884d8' , label: 'Budget'}, // Série des budgets
                ]}
                height={400} 
                margin={{ left: 75 }}
              />
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
}
