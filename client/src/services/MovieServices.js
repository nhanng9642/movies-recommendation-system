import { convertQuery, fetchData } from "./utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const movieUrl = `${API_URL}/movies`;

export const searchMovies = async (query) =>{
  const queryString = convertQuery(query);
  return fetchData(`${movieUrl}?${queryString}`);
}

export const getTrendingMovies = async (day = 'day') => {
  let page = 1;
  if (day === 'week') page = 2;
  return fetchData(`${movieUrl}?page=${page}&limit=14&sort=-release_date&release_date[lte]=2024-11-05`);
}

export const getPopularMovies = async () => 
  fetchData(`${movieUrl}?page=1&limit=14&sort=-popularity`);

export const getLastestMovies = async (limit = 6) => 
  fetchData(`${movieUrl}?page=1&limit=${limit}&sort=-release_date&release_date[lte]=2024-10-9`);

export const getMovieDetail = async (movieId) => fetchData(`${movieUrl}/${movieId}`);

export const getCreditsFromMovieId = async (movieId) => fetchData(`${movieUrl}/${movieId}/credits`);

export const getCastDetail = async (castId) => fetchData(`${API_URL}/casts/${castId}`);

export const getCreditFromMovieList = async (movieList) => fetchData(`${movieUrl}/list-movies/cast`, "POST", movieList);

export const getCastMovies = async (castId, limit = 7) => fetchData(`${API_URL}/casts/${castId}/movies?limit=${limit}`);