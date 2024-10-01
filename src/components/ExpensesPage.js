import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

export default function ExpensesPage() {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Ajouter des dépenses
        </Typography>
        <Typography paragraph>
          Ici, vous pouvez ajouter des dépenses au fur et à mesure du mois.
        </Typography>
        {/* Ajoute le formulaire pour ajouter des dépenses ici */}
      </Paper>
    </Container>
  );
}
