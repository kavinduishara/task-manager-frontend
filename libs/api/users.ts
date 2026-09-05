import { ApiResponseData, GetUserDetailsResponse } from "@/types/user";
import { api } from "./client";
import type {
    GetTaskUsersResponse,
  TaskUser,
} from "@/types/task";

export async function getAllUsers(): Promise<TaskUser[]> {
  const response = await api.get<GetTaskUsersResponse>("/users");

  return response.data.data;
}

export async function getMyDetails(): Promise<ApiResponseData> {
  const response = await api.get<GetUserDetailsResponse>("/users/me");

  return response.data.data;
}
