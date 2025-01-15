import {fetchDataWithToken } from "./utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const URL = `${API_URL}/movies/rating`;

export const getAllRatingMovie = async () =>
  fetchDataWithToken(`${URL}`);

export const postRatingMovie = async (movieId, rating) =>
  fetchDataWithToken(`${URL}`, "POST", {movieId, rating});

export const getCurrentRatingMovie = async (movieId) =>
  fetchDataWithToken(`${URL}/${movieId}`);

