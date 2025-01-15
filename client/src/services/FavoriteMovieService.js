import {fetchDataWithToken } from "./utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const URL = `${API_URL}/liked-movies`;

export const changeFavoriteStatus = async (movieId) =>
  fetchDataWithToken(`${URL}`, "POST", {movieId});

export const getStatusFavorite = async (movieId) =>
  fetchDataWithToken(`${URL}/check/?movieId=${movieId}`);

export const getFavoriteMovies = async (page = 1, limit = 7) =>
  fetchDataWithToken(`${URL}?page=${page}&limit=${limit}`);