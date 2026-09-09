export const TAGS = [
  "feature",
  "design",
  "frontend",
  "backend",
  "development",
  "devops",
  "documentation",
  "bug",
] as const;

export const PRIORITIES = ["Low", "Med", "High", "Urgent"] as const;

export type Label = (typeof TAGS)[number];
export type Priority = (typeof PRIORITIES)[number];

export interface CardAssignee {
  name: string;
  email?: string;
  profilePicture?: string;
}

export interface CardProps {
  id: string | number;
  title: string;
  flag?: Label;
  description?: string;
  priority?: Priority;
  status?: string;
  assignee?: CardAssignee | null;
  creatorId?: string;
  assigneeId?: string | null;
  subtasks?: Array<{ _id?: string; task: string; checked: boolean }>;
  dueDate?: Date | null;
}

export const labelColors: Record<Label, string> = {
  design: "bg-blue-100 text-blue-500",
  development: "bg-green-100 text-green-500",
  backend: "bg-purple-100 text-purple-500",
  documentation: "bg-gray-100 text-gray-500",
  feature: "bg-yellow-100 text-yellow-500",
  frontend: "bg-cyan-100 text-cyan-500",
  devops: "bg-orange-100 text-orange-500",
  bug: "bg-red-100 text-red-500",
};

export const priorityStyles: Record<Priority, string> = {
  Low: "bg-slate-100 text-slate-500",
  Med: "bg-blue-100 text-blue-500",
  High: "bg-orange-100 text-orange-500",
  Urgent: "bg-red-100 text-red-500",
};

export const labelBarColors: Record<Label, string> = {
  design: "bg-blue-500",
  development: "bg-green-500",
  backend: "bg-purple-500",
  documentation: "bg-gray-500",
  feature: "bg-yellow-500",
  frontend: "bg-cyan-500",
  devops: "bg-orange-500",
  bug: "bg-red-500",
};

export const priorityBarColors: Record<Priority, string> = {
  Low: "bg-slate-500",
  Med: "bg-blue-500",
  High: "bg-orange-500",
  Urgent: "bg-red-500",
};

