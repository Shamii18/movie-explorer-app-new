import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetailPage from './pages/MovieDetailPage';
import Login from './components/Login';
import ThemeProvider from './ThemeProvider';
import Header from './components/Header';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [ratings, setRatings] = useState([]);

  const TMDB_API_KEY = 'a90d009f505765677b0c2528d6520921'; 

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
        setGenres([]); 
      }
    };

    const generateYears = () => {
      const currentYear = new Date().getFullYear();
      const yearsArray = [];
      for (let i = 0; i < 10; i++) {
        yearsArray.push((currentYear - i).toString());
      }
      setYears(yearsArray);
    };

    const loadRatings = () => {
      setRatings(['G', 'PG', 'PG-13', 'R', 'NC-17']);
    };

    fetchGenres();
    generateYears();
    loadRatings();
  }, []);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ThemeProvider>
      <MovieProvider>
        <Router>
          {user && <Header user={user} onLogout={handleLogout} />}
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Home genres={genres} years={years} ratings={ratings} />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Routes>
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
};

export default App;
