import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

export default function BudgetPage() {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Définir le budget
        </Typography>
        <Typography paragraph>
          Ici, vous pouvez définir votre budget pour chaque catégorie.
        </Typography>
        {/* Ajoute le formulaire pour définir le budget ici */}
      </Paper>
    </Container>
  );
}
