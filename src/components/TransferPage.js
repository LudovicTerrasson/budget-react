import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

export default function TransferPage() {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Envoyer de l'argent
        </Typography>
        <Typography paragraph>
          Ici, vous pouvez envoyer de l'argent à un autre utilisateur.
        </Typography>
        {/* Ajoute le formulaire pour transférer de l'argent ici */}
      </Paper>
    </Container>
  );
}
