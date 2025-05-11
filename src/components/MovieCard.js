import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';

const MovieCard = ({ movie, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: 250,
        height: 400,
        margin: '16px',
        backgroundColor: '#1E1E1E',
        color: '#E0E0E0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        borderRadius: 2,
      }}
    >
      <CardMedia
  component="img"
  image={
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image'
  }
  alt={movie.title}
  sx={{ height: 200, objectFit: 'cover' }}
/>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2">Release: {movie.release_date}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>Rating: {movie.vote_average}</Typography>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.stopPropagation(); 
              onClick();
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
