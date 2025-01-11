import { fetchData, fetchDataWithToken } from "./utils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const signUp = async (data) => fetchData(`${API_URL}/users/register`, "POST", data);

export const signIn = async (data) => fetchData(`${API_URL}/auth/login`, "POST", data);

export const getProfile = async () => fetchDataWithToken(`${API_URL}/users/profile`);

export function logInWithGoogle() {
    window.location.href = `${API_URL}/auth/google/login`;
}
