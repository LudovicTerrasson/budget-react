import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function Appbar() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EMArgent
          </Typography>
          {user ? (
            <Box>
              <Typography variant="body1" sx={{ mr: 2 }}>{user.name}</Typography>
              <Button color="inherit" onClick={logout}>Déconnexion</Button>
            </Box>
          ) : (
            <Button color="inherit" component={Link} to="/login">Connexion</Button>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/">Accueil</MenuItem>
            {user && (
              <>
                <MenuItem component={Link} to="/dashboard">Dashboard</MenuItem>
                <MenuItem component={Link} to="/budget">Définir Budget</MenuItem>
                <MenuItem component={Link} to="/expenses">Dépenses</MenuItem>
                <MenuItem component={Link} to="/transfer">Transfert</MenuItem>
              </>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}