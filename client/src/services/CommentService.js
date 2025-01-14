import { fetchData, fetchDataWithToken } from "./utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const URL = `${API_URL}/comment`;

export const addComment = async (data) =>
  fetchDataWithToken(`${URL}`, "POST", data);

export const getAllComment = async (movieId) =>
  fetchData(`${URL}?movieId=${movieId}`);

