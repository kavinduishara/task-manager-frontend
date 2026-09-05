import { api } from "./client";
import type {
  CreateTaskInput,
  GetTaskResponse,
  GetTasksResponse,
  Task,
  TaskMutationResponse,
  UpdateTaskInput,
} from "@/types/task";

export async function getTasks(): Promise<Task[]> {
  const response = await api.get<GetTasksResponse>("/tasks");

  return response.data.data;
}

export async function getTask(id: string): Promise<Task> {
  const response = await api.get<GetTaskResponse>(`/tasks/${id}`);

  return response.data.data;
}

export async function createTask(task: CreateTaskInput): Promise<Task> {
  const response = await api.post<TaskMutationResponse>("/tasks", task);

  return response.data.task;
}

export async function updateTask(
  id: string,
  task: UpdateTaskInput
): Promise<Task> {
  const response = await api.patch<TaskMutationResponse>(
    `/tasks/${id}`,
    task
  );

  return response.data.task;
}

export async function deleteTask(id: string) {
  const response = await api.delete(`/tasks/${id}`);

  return response.data;
}