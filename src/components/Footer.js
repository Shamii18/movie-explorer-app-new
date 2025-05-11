import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#121212', color: '#E0E0E0', padding: '16px', textAlign: 'center' }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Movie Explorer by Shameera. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <a href="https://www.themoviedb.org/" style={{ color: '#03A9F4' }}>Powered by TMDb</a>
      </Typography>
    </Box>
  );
};

export default Footer;
