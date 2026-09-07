import {
  ApiResponseData,
  GetUserDetailsResponse,
  GetUsersResponse,
  UserDetails,
} from "@/types/user";
import { api } from "./client";
import type { GetTasksResponse, Task } from "@/types/task";

export async function getAllUsers(): Promise<UserDetails[]> {
  const response = await api.get<GetUsersResponse>("/users");

  return response.data.data;
}

export async function getMyDetails(): Promise<ApiResponseData> {
  const response = await api.get<GetUserDetailsResponse>("/users/me");

  return response.data.data;
}
export async function getMyTasks(): Promise<Task[]> {
  const response = await api.get<GetTasksResponse>("/users/myTasks");

  return response.data.data;
}
