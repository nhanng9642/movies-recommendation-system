const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export async function signUp(data) {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function signIn(data) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function getProfile() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/users/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export function logInWithGoogle() {
    window.location.href = `${API_URL}/auth/google/login`;
}
