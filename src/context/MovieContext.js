import React, { createContext, useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../tmdbApi'; 


export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  useEffect(() => {
    const getTrendingMovies = async () => {
      const trendingMovies = await fetchTrendingMovies();
      setMovies(trendingMovies);
    };
    getTrendingMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <MovieContext.Provider value={{ movies, favorites, setFavorites }}>
      {children}
    </MovieContext.Provider>
  );
};
