export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export const TASK_STATUS_OPTIONS = [
  { value: "TODO", label: "To do" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "DONE", label: "Done" },
] as const satisfies ReadonlyArray<{ value: TaskStatus; label: string }>;

export interface TaskUser {
  _id: string;
  name: string;
  email: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  creator: TaskUser;
  assignee: TaskUser | null;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetTasksResponse {
  message: string;
  data: Task[];
}

export interface TaskColumn {
  id: TaskStatus;
  title: string;
  cards: Task[];
}

export interface GetTaskResponse {
  message: string;
  data: Task;
}

export interface GetTaskUsersResponse {
  message: string;
  data: TaskUser[];
}

export interface TaskMutationResponse {
  message: string;
  task: Task;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  assignee?: string;
  dueDate?: string;
}

export type UpdateTaskInput = Partial<CreateTaskInput>;
