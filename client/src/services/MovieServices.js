import { fetchData } from "./utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const movieUrl = `${API_URL}/movies`;

export const searchMovies = async (queryString) => fetchData(`${movieUrl}/search?${queryString}`);

export const getTrendingMovies = async (day = 'day') => fetchData(`${movieUrl}/trending/${day}`);

export const getMovieDetail = async (movieId) => fetchData(`${movieUrl}/${movieId}`);

export const getCreditsFromMovieId = async (movieId) => fetchData(`${movieUrl}/${movieId}/credits`);
