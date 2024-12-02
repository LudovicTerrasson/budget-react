import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Snackbar } from '@mui/material';
import { useAuth } from '../context/AuthContext'; // Import du contexte d'authentification
import { useNavigate } from 'react-router-dom';

export default function TransferPage() {
  const { user } = useAuth(); // Récupération de l'utilisateur connecté
  const [name, setNameTr] = useState('');
  const [montantTr, setMontantTr] = useState('');
  const [categorie, setCategoryTr] = useState('');
  const [name_other_user, setNameOtherUser] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false); // État pour gérer la Snackbar
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState(''); // État pour le message d'erreur
  const navigate = useNavigate();

  const handleAddOperation = (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    if (!name || !montantTr || !categorie) {
      setErrorSnackbarMessage("Tous les champs doivent être remplis.");
      setOpenSnackbar(true); // Ouvrir le Snackbar d'erreur
      return; // Ne pas procéder à l'enregistrement
    }


    // Convertir les champs en nombres
    const montant = parseFloat(montantTr) || 0;

    const name_from = "De " + user.name + " : " + name;
    const name_for = "Pour " + name_other_user + " : " + name;

    const transfer_giver = {
      categorie,
      montant,
      name_for,
      studentId: user.id // Ajout de l'ID de l'utilisateur
    };

    console.log(transfer_giver);

    // Initialisation de l'objet `transfer_receiver`
let transfer_receiver = null;

const fetchStudentId = async (name_other_user) => {
    try {
        const response = await fetch(`http://localhost:8080/student/getId?pseudo=${encodeURIComponent(name_other_user)}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Erreur lors de l'obtention de l'id : " + response.statusText);
        }

        const otherId = await response.text(); // Utilisez response.json() si l'API retourne un JSON
        console.log("ID du destinataire :", otherId);

        return otherId;
    } catch (error) {
        console.error("Erreur lors de l'obtention de l'id du destinataire :", error);
        throw error; // Réémet l'erreur si nécessaire
    }
};

// Récupérer l'ID et mettre à jour `transfer_receiver`
const initializeTransferReceiver = async (nameOtherUser) => {
    try {
        const id = await fetchStudentId(nameOtherUser);
        console.log("ID obtenu :", id);

        // Mettre à jour l'objet `transfer_receiver`
        transfer_receiver = {
            categorie,
            montant,
            name_from,
            studentId: id, // Ajout de l'ID de l'utilisateur
        };

        console.log("Objet transfer_receiver mis à jour :", transfer_receiver);
    } catch (error) {
        console.error("Erreur lors de l'initialisation de transfer_receiver :", error);
    }
};

// Appeler la fonction pour initialiser `transfer_receiver`
initializeTransferReceiver("nom_utilisateur");

  

    fetch("http://localhost:8080/depense/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transfer_giver)
    }).then(() => {
      console.log("Dépense enregistrée pour le donneur");
      setOpenSnackbar(true); // Ouvrir le Snackbar de succès
      setErrorSnackbarMessage(''); // Réinitialiser le message d'erreur
      navigate('/expenses');
    }).catch(error => {
      console.error("Erreur lors de l'enregistrement de la recette :", error);
    });

    fetch("http://localhost:8080/recette/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transfer_receiver)
    }).then(() => {
      console.log("Recette enregistrée pour le destinataire");
      setOpenSnackbar(true); // Ouvrir le Snackbar de succès
      setErrorSnackbarMessage(''); // Réinitialiser le message d'erreur
      navigate('/expenses');
    }).catch(error => {
      console.error("Erreur lors de l'enregistrement de la recette :", error);
    });

  };

  const categories = [
    { value: 'coursesBudget', label: 'Course' },
    { value: 'housingBudget', label: 'Logement' },
    { value: 'leisureBudget', label: 'Loisirs' },
    { value: 'subscriptionBudget', label: 'Abonnement' },
    { value: 'transportBudget', label: 'Transport' },
    { value: 'savingsBudget', label: 'Epargne' }
  ];


  // Fonction pour gérer le changement de sélection
  const handleCategoryChange = (event) => {
    setCategoryTr(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Fermer le Snackbar
  };



  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Définir le transfer
        </Typography>
        <form onSubmit={handleAddOperation}>
          <TextField
            label="Pseudo du destinataire"
            value={name_other_user}
            onChange={(e) => setNameOtherUser(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nom de l'opération"
            value={name}
            onChange={(e) => setNameTr(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Montant"
            value={montantTr}
            onChange={(e) => setMontantTr(e.target.value)}
            fullWidth
            margin="normal"
          />
          <label>
            Sélectionnez la catégorie de la transaction:
            <select value={categorie} onChange={handleCategoryChange}>
              <option value="">-- Choisissez une catégorie --</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>
          <Button type="submit" variant="contained" color="primary">
            Enregistrer le transfer
          </Button>
        </form>
      </Paper>

      {/* Snackbar de succès */}
      <Snackbar
        open={openSnackbar && !errorSnackbarMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Opération enregistré avec succès !"
      />

      {/* Snackbar d'erreur */}
      <Snackbar
        open={openSnackbar && errorSnackbarMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={errorSnackbarMessage}
      />
    </Container>
  );
}
