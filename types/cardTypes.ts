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
  dueDate?: Date | null;
}

export const labelColors: Record<Label, string> = {
  design: "blue",
  development: "green",
  backend: "purple",
  documentation: "gray",
  feature: "yellow",
  frontend: "cyan",
  devops: "orange",
  bug: "red",
};

export const priorityStyles: Record<Priority, string> = {
  Low: "slate",
  Med: "blue",
  High: "orange",
  Urgent: "red",
};

export const labelTextColors: Record<Label, string> = {
  design: "text-blue-500",
  development: "text-green-500",
  backend: "text-purple-500",
  documentation: "text-gray-500",
  feature: "text-yellow-500",
  frontend: "text-cyan-500",
  devops: "text-orange-500",
  bug: "text-red-500",
};

export const priorityTextStyles: Record<Priority, string> = {
  Low: "text-slate-500",
  Med: "text-blue-500",
  High: "text-orange-500",
  Urgent: "text-red-500",
};

