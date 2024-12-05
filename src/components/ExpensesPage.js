import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import {  Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function ExpensesPage() {
  const { user } = useAuth();
  const [depenses, setDepenses] = useState([]);
  const [recettes, setRecettes] = useState([]);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection
  
  
  useEffect(() => {
    // Fonction pour récupérer les dépenses et les recettes depuis le backend
    const fetchData = async () => {
      try {
        const responseDepense = await fetch(`http://localhost:8080/depense/getDepense/${user.id}`);
        const responseRecette = await fetch(`http://localhost:8080/recette/getRecette/${user.id}`);
        
        // Vérifier la réponse pour les dépenses
        if (!responseDepense.ok) {
          throw new Error(`HTTP error! status: ${responseDepense.status}`);
        }
        const dataDepense = await responseDepense.json();
        console.log(dataDepense);
        setDepenses(dataDepense);

        // Vérifier la réponse pour les recettes
        if (!responseRecette.ok) {
          throw new Error(`HTTP error! status: ${responseRecette.status}`);
        }
        const dataRecette = await responseRecette.json();
        console.log(dataRecette);
        setRecettes(dataRecette);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchData(); 

  }, [user.id]); 

  // Combinaison des dépenses et des recettes dans un seul tableau
  const combinedData = [
    ...depenses.map(depense => ({
      id: depense.id,
      name: depense.name,
      montant: -depense.montant,
      categorie: depense.categorie,
      type: 'depense',
      date : new Date(depense.textdate)
    })),
    ...recettes.map(recette => ({
      id: recette.id,
      name: recette.name,
      montant: recette.montant,
      categorie: recette.categorie,
      type: 'recette',
      date : new Date(recette.textdate)
    }))
  ];

  console.log(combinedData);

  // Tri des données combinées par ID du plus grand au plus petit
  const sortedCombinedData = combinedData.sort((a, b) => b.date - a.date);

  // Fonction pour naviguer vers la page AddOperationPage.js
  const handleAddOperation = () => {
    navigate('/add-operation'); // Redirige vers le chemin configuré pour AddOperationPage
  };
  
  // Fonction pour naviguer vers la page de modification
  const handleEditOperation = (id, type) => {
    navigate(`/edit-operation/${type}/${id}`); // Redirige vers le chemin configuré pour EditOperationPage
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '50px 20px', margin: '20px auto' }}>
        <Typography variant="h4" gutterBottom>
          Liste des dépenses et recettes
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAddOperation} 
          style={{ marginBottom: '20px' }}
        >
          Ajouter
        </Button>
        <TableContainer component={Paper} style={{ height: '500px', overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Nom</strong></TableCell>
                <TableCell align="right"><strong>Montant (€)</strong></TableCell>
                <TableCell align="right"><strong>Catégorie</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCombinedData.map((item) => (
                <TableRow key={`${item.id}-${item.type}`}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right" style={{ color: item.montant < 0 ? 'red' : 'green' }}>
                    {item.montant >= 0 ? `+${item.montant.toFixed(2)}` : item.montant.toFixed(2)}€
                  </TableCell>
                  <TableCell align="right">{item.categorie}</TableCell>
                  <TableCell align="center">
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      onClick={() => handleEditOperation(item.id, item.type)}
                    >
                      Modifier
                    </Button>
                  </TableCell> 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
