import { apiFetch } from "./client";
import type {
  CreateTaskInput,
  GetTaskResponse,
  GetTasksResponse,
  Task,
  TaskMutationResponse,
  UpdateTaskInput,
} from "@/types/task";

export async function getTasks(): Promise<Task[]> {
  const data = await apiFetch<GetTasksResponse>("/tasks");

  return data.data;
}

export async function getTask(id: string): Promise<Task> {
  const data = await apiFetch<GetTaskResponse>(`/tasks/${id}`);

  return data.data;
}

export async function createTask(task: CreateTaskInput): Promise<Task> {
  const data = await apiFetch<TaskMutationResponse>("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });

  return data.task;
}

export async function updateTask(
  id: string,
  task: UpdateTaskInput
): Promise<Task> {
  const data = await apiFetch<TaskMutationResponse>(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(task),
  });

  return data.task;
}

export async function deleteTask(id: string) {
  return apiFetch(`/tasks/${id}`, {
    method: "DELETE",
  });
}
