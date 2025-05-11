import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#494545', zIndex: 1300 }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Movie Explorer
        </Typography>
        {user && (
          <>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
