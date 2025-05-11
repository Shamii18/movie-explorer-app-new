import React from 'react';
import { TextField, Box, InputAdornment, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch, genres = [], years = [], ratings = [] }) => {
  const [query, setQuery] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState('');
  const [selectedYear, setSelectedYear] = React.useState('');
  const [selectedRating, setSelectedRating] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() || selectedGenre || selectedYear || selectedRating) {
      onSearch(query, selectedGenre, selectedYear, selectedRating);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 3,
        px: 2,
      }}
    >
      <TextField
        label="Search for a movie..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{
          maxWidth: 500,
          backgroundColor: 'white',
          borderRadius: 1,
          mb: 2,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 500 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            label="Genre"
            variant="outlined"
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
            }}
          >
            {genres && genres.length > 0 ? (
              genres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No genres available</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year"
            variant="outlined"
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
            }}
          >
            {years && years.length > 0 ? (
              years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No years available</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Rating</InputLabel>
          <Select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            label="Rating"
            variant="outlined"
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
            }}
          >
            {ratings && ratings.length > 0 ? (
              ratings.map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No ratings available</MenuItem>
            )}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SearchBar;
