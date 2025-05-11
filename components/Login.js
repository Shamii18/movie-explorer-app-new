import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import BackgroundImage from '../assets/movie.jpeg';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      onLogin(username);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `url(${BackgroundImage}) no-repeat center center / cover`,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: 4,
          borderRadius: 3,
          width: '100%',
          maxWidth: 350,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom color="white">
          Movie Explorer Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ textAlign: 'left', mb: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontSize: '1.2rem',fontFamily: 'Arial', mb: 1 }}>
              Username
            </Typography>
            <TextField
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              size="small"
              InputProps={{ style: { color: 'black', fontSize: '0.9rem' } }}
            />
          </Box>
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontSize: '1.2rem',fontFamily: 'Arial', mb: 1 }}>
              Password
            </Typography>
            <TextField
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              size="small"
              InputProps={{ style: { color: 'black', fontSize: '0.9rem' } }}
            />
          </Box>
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
