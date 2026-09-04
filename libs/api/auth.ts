import { apiFetch } from "./client";

export async function login(email: string, password: string) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function register(
  name: string,
  email: string,
  password: string
) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export async function logout() {
  return apiFetch("/auth/logout", {
    method: "POST",
  });
}