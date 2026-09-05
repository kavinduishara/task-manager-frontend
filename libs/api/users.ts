import { api } from "./client";
import type {
    GetTaskUsersResponse,
  TaskUser,
} from "@/types/task";

export async function getAllUsers(): Promise<TaskUser[]> {
  const response = await api.get<GetTaskUsersResponse>("/users");

  return response.data.data;
}
