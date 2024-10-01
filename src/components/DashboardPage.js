import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

export default function DashboardPage() {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Tableau de bord
        </Typography>
        <Typography paragraph>
          Ici, vous pouvez voir un aperçu général de vos dépenses et de votre budget.
        </Typography>
        {/* Ajoute des graphiques ou des statistiques ici */}
      </Paper>
    </Container>
  );
}
