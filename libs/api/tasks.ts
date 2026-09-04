import { apiFetch } from "./client";

export async function getTasks() {
  const data = await apiFetch("/api/tasks");

  return data.data;
}

export async function getTask(id: string) {
  const data = await apiFetch(`/api/tasks/${id}`);

  return data.data;
}

export async function createTask(task: {
  title: string;
  description: string;
  status: string;
  assignee?: string;
  dueDate?: string;
}) {
  const data = await apiFetch("/api/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });

  return data.task;
}

export async function updateTask(
  id: string,
  task: Partial<{
    title: string;
    description: string;
    status: string;
    assignee: string;
    dueDate: string;
  }>
) {
  const data = await apiFetch(`/api/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(task),
  });

  return data.task;
}

export async function deleteTask(id: string) {
  return apiFetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
}