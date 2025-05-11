import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { Grid } from '@mui/material';

const Favorites = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <div>
      <h2>Favorites</h2>
      <Grid container spacing={2}>
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <MovieCard movie={movie} onClick={() => console.log(movie.id)} />
            </Grid>
          ))
        ) : (
          <p>No favorite movies added yet.</p>
        )}
      </Grid>
    </div>
  );
};

export default Favorites;
