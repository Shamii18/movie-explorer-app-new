import React, { useEffect, useState, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
  CircularProgress,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { MovieContext } from '../context/MovieContext';  

const API_KEY = 'a90d009f505765677b0c2528d6520921';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const MovieDetails = ({ movieId, open, onClose }) => {
  const { favorites, setFavorites } = useContext(MovieContext); 
  const [movieData, setMovieData] = useState(null);
  
  useEffect(() => {
    if (movieId) {
      const fetchDetails = async () => {
        try {
          const res = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits`
          );
          setMovieData(res.data);
        } catch (error) {
          console.error('Failed to fetch movie details:', error);
        }
      };
      fetchDetails();
    }
  }, [movieId]);

  if (!movieData) {
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          <CircularProgress />
        </Box>
      </Modal>
    );
  }

  const trailer = movieData.videos.results.find((v) => v.type === 'Trailer');
  
  const isFavorite = favorites.some((movie) => movie.id === movieData.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((movie) => movie.id !== movieData.id));
    } else {
      setFavorites([...favorites, movieData]);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" gutterBottom>{movieData.title}</Typography>
        <Typography variant="subtitle1" gutterBottom>{movieData.overview}</Typography>

        {movieData.genres?.length > 0 && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Genres:</strong> {movieData.genres.map((g) => g.name).join(', ')}
          </Typography>
        )}

        {movieData.credits?.cast?.length > 0 && (
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Cast:</strong> {movieData.credits.cast.slice(0, 5).map((actor) => actor.name).join(', ')}
          </Typography>
        )}

        {trailer && (
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Trailer
          </Button>
        )}

        {/* Favorite Button */}
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          color={isFavorite ? 'secondary' : 'primary'}
          onClick={toggleFavorite}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
      </Box>
    </Modal>
  );
};

export default MovieDetails;
