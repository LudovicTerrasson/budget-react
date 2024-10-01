import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Bienvenue sur EMArgent
        </Typography>
        <Typography variant="h6" gutterBottom>
          Votre application pour la gestion de budget étudiant
        </Typography>
        <Typography paragraph>
          EMArgent est conçue pour aider les étudiants à mieux gérer leur budget et à suivre leurs dépenses mensuelles. Avec notre application, vous pouvez définir des budgets pour différentes catégories, ajouter des dépenses au fur et à mesure, et suivre vos finances avec un tableau de bord intuitif.
        </Typography>
        <Typography paragraph>
          Voici quelques conseils pour une gestion efficace de votre budget :
          <ul>
            <li>Fixez des limites pour chaque catégorie de dépenses.</li>
            <li>Suivez régulièrement vos dépenses pour rester sur la bonne voie.</li>
            <li>Prévoyez une réserve pour les imprévus.</li>
            <li>Utilisez des outils pour visualiser et analyser vos dépenses.</li>
          </ul>
        </Typography>
        <Typography paragraph>
          Découvrez nos ressources et conseils pour améliorer vos compétences en gestion financière. Vous pouvez également consulter des vidéos éducatives pour approfondir vos connaissances.
        </Typography>
      </Paper>
    </Container>
  );
}
