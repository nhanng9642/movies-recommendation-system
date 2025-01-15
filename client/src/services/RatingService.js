import {fetchDataWithToken } from "./utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const URL = `${API_URL}/movies/rating`;

export const getAllRatingMovie = async (page = 1, limit = 5) =>
  fetchDataWithToken(`${API_URL}/users/ratings?limit=${limit}&page=${page}`);

export const postRatingMovie = async (movieId, rating) =>
  fetchDataWithToken(`${URL}`, "POST", {movieId, rating});

export const getCurrentRatingMovie = async (movieId,) =>
  fetchDataWithToken(`${API_URL}/users/movies/${movieId}/rating`);

