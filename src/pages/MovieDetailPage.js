import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../tmdbApi';
import { MovieContext } from '../context/MovieContext';
import { Typography, Button, Box, Chip, Grid } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MovieDetailPage = ({ user, onLogout }) => {
  const { id } = useParams();
  const { favorites, setFavorites } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      const details = await fetchMovieDetails(id);
      setMovie(details);
    };
    getMovieDetails();
  }, [id]);

  useEffect(() => {
    if (movie) {
      const exists = favorites.some((fav) => fav.id === movie.id);
      setIsFavorite(exists);
    }
  }, [movie, favorites]);

  const handleToggleFavorite = () => {
    if (!movie) return;
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites((prev) => [...prev, movie]);
    }
    setIsFavorite(!isFavorite);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <Box sx={{ padding: '16px', backgroundColor: '#1E1E1E', color: '#E0E0E0' }}>
        <Typography variant="h4" gutterBottom>{movie.title} ({movie.release_date?.split('-')[0]})</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{movie.overview}</Typography>

        {/* Genres */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Genres:</Typography>
          {movie.genres?.map((genre) => (
            <Chip key={genre.id} label={genre.name} sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>

        {/* Cast */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Top Cast:</Typography>
          <Grid container spacing={1}>
            {movie.cast?.map((actor) => (
              <Grid item key={actor.cast_id}>
                <Chip label={actor.name} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Favorite Button */}
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            color={isFavorite ? 'secondary' : 'primary'}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        </Box>

        {/* Trailer */}
        {movie.trailer && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" gutterBottom>Watch Trailer:</Typography>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${movie.trailer.key}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </Box>
        )}
      </Box>
      <Footer />
    </div>
  );
};

export default MovieDetailPage;
