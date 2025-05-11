import axios from 'axios';

const API_KEY = 'a90d009f505765677b0c2528d6520921'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovieDetails = async (movieId) => {
  try {
    const [detailsRes, creditsRes, videosRes] = await Promise.all([
      axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`),
      axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`),
      axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
    ]);

    return {
      ...detailsRes.data,
      cast: creditsRes.data.cast.slice(0, 5),
      trailer: videosRes.data.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      )
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};
export default fetchTrendingMovies;
