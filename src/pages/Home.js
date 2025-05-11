import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { Box, Grid, Typography, Button } from '@mui/material';
import axios from 'axios';

const API_KEY = 'a90d009f505765677b0c2528d6520921';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [ratings] = useState(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNumber = 1) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNumber}`
    );
    const newMovies = res.data.results;

    if (pageNumber === 1) {
      setMovies(newMovies);
      setFilteredMovies(newMovies);
    } else {
      setMovies((prev) => [...prev, ...newMovies]);
      setFilteredMovies((prev) => [...prev, ...newMovies]);
    }

    if (res.data.page >= res.data.total_pages) {
      setHasMore(false);
    }
  };


  const fetchGenres = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
    );
    setGenres(res.data.genres.map((g) => g.name));
  };

  useEffect(() => {
    fetchMovies(1);
    fetchGenres();

    const yearList = Array.from({ length: 25 }, (_, i) => (2024 - i).toString());
    setYears(yearList);
  }, []);

  const handleSearch = (query, selectedGenre, selectedYear, selectedRating) => {

  localStorage.setItem('lastSearch', JSON.stringify({ query, selectedGenre, selectedYear, selectedRating }));

  const filtered = movies.filter((movie) => {
    const matchesTitle = query ? movie.title.toLowerCase().includes(query.toLowerCase()) : true;
    const matchesGenre = selectedGenre
      ? movie.genre_ids.some((id) => {
          const genre = genres.find((g) => g === selectedGenre);
          return genre;
        })
      : true;
    const matchesYear = selectedYear ? movie.release_date.startsWith(selectedYear) : true;
    const matchesRating = selectedRating ? Math.floor(movie.vote_average).toString() === selectedRating : true;

    return matchesTitle && matchesGenre && matchesYear && matchesRating;
  });

  setFilteredMovies(filtered);
};


  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchMovies(nextPage);
    setPage(nextPage);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <SearchBar onSearch={handleSearch} genres={genres} years={years} ratings={ratings} />
      <Grid container spacing={2} justifyContent="center">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => (window.location.href = `/movie/${movie.id}`)}
            />
          ))
        ) : (
          <Typography variant="h6" color="textSecondary">
            No movies found.
          </Typography>
        )}
      </Grid>

      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;
