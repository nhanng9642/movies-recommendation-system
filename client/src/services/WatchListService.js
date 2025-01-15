import {fetchDataWithToken } from "./utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const URL = `${API_URL}/movie-list`;

export const createNewWatchList = async (data) =>
  fetchDataWithToken(`${URL}`, "POST", data);

export const getAllWatchList = async () => fetchDataWithToken(`${URL}`);

export const addMovieToWatchList = async (listId, movieId) =>
  fetchDataWithToken(`${URL}/${listId}/movies`, "POST", {movieId});

export const getWatchingListDetail = async (id) =>
  fetchDataWithToken(`${URL}/${id}/movies`);