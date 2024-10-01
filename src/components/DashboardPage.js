import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Grid } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [totals, setTotals] = useState({});

  useEffect(() => {
    const fetchBudgets = async () => {
      const response = await fetch(`http://localhost:8080/budget/getBudgets/${user.id}`);
      const data = await response.json();
      setBudgets(data);
      calculateTotals(data);
    };
    
    fetchBudgets();
  }, [user.id]);

  const calculateTotals = (budgets) => {
    const totals = budgets.reduce((acc, budget) => {
      acc[budget.category] = (acc[budget.category] || 0) + budget.amount;
      return acc;
    }, {});
    setTotals(totals);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          État des Budgets par Catégorie
        </Typography>
        <Grid container spacing={2}>
          {Object.entries(totals).map(([category, total]) => (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <Paper elevation={2} style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6">{category}</Typography>
                <Typography variant="h5">{total.toFixed(2)} €</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
}
