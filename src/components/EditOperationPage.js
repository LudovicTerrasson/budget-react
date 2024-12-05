import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, TextField, MenuItem, Button, Snackbar } from '@mui/material';

export default function EditOperationPage() {
  const { id, type } = useParams(); // Récupération des paramètres id et type depuis l'URL
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [montant, setMontant] = useState('');
  const [categorie, setCategorie] = useState('');
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false); // État pour gérer la Snackbar

  // Exemple de catégories pour le menu déroulant
  const categories = [
    { value: 'coursesBudget', label: 'Courses' },
    { value: 'housingBudget', label: 'Logement' },
    { value: 'leisureBudget', label: 'Loisirs' },
    { value: 'subscriptionBudget', label: 'Abonnement' },
    { value: 'transportBudget', label: 'Transport' },
    { value: 'savingsBudget', label: 'Épargne' }
  ];

  useEffect(() => {
    // Charger les détails de l'opération depuis le serveur
    const fetchOperationDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/${type}/get/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        const data = await response.json();
        setName(data.name);            // Pré-remplit le champ Nom
        setMontant(data.montant);      // Pré-remplit le champ Montant
        setCategorie(data.categorie);  // Pré-remplit le champ Catégorie
        setLoading(false);             // Arrête l'affichage de chargement une fois les données récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération de l'opération:", error);
      }
    };

    fetchOperationDetails();
  }, [id, type]);


  // Fonction pour gérer la validation des modifications
  const handleSubmit = async () => {
    try {
      const updatedOperation = { id, categorie, montant: parseFloat(montant), name };
      const response = await fetch(`http://localhost:8080/${type}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOperation)
      });
      if (response.ok) {
        setOpenSnackbar(true); // Ouvrir le Snackbar de confirmation
        setTimeout(() => navigate('/expenses'), 1000); // Redirection après 1s
        console.log("Opération mise à jour avec succès");
      } else {
        console.error("Erreur lors de la mise à jour de l'opération");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'opération:", error);
    }
  };

  // Fonction pour gérer la suppression de l'opération
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/${type}/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setOpenSnackbar(true); // Ouvrir le Snackbar de confirmation
        setTimeout(() => navigate('/expenses'), 1000); // Redirection après 1s
      } else {
        console.error("Erreur lors de la suppression de l'opération");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'opération:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto', maxWidth: '500px' }}>
        <Typography variant="h5" gutterBottom>
          Modifier l'opération
        </Typography>
        <TextField
          label="Nom de l'opération"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Montant"
          type="number"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Catégorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          fullWidth
          margin="normal"
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Boutons en bas de page */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Supprimer
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Valider
          </Button>
        </div>

        {/* Snackbar de confirmation */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Opération réussie !"
        />
      </Paper>
    </Container>
  );
}
