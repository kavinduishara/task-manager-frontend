import { LoginResponse } from "@/types/user";
import { api } from "./client";

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return response.data;
}

export async function register(
  name: string,
  email: string,
  password: string
) {
  const response = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return response.data;
}

export async function logout() {
  const response = await api.post("/auth/logout");

  return response.data;
}