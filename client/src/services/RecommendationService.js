import { fetchData } from "./utils"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const URL = `${API_URL}/recommendation`

export const getRetriver = async (query) =>
  fetchData(`${URL}/retriever?query=${query}`);

export const getNavigation = async (query) =>
  fetchData(`${URL}/navigation?query=${query}`);