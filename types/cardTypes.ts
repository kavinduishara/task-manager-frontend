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

export type Label = (typeof TAGS)[number];

export interface CardAssignee {
  name: string;
  email?: string;
  profilePicture?: string;
}

export interface CardProps {
  id: string | number;
  title: string;
  label?: Label;
  description?: string;
  assignee?: CardAssignee | null;
  dueDate?: Date | null;
}

export const labelColors: Record<Label, string> = {
  design: "bg-blue-100 text-blue-700",
  development: "bg-green-100 text-green-700",
  backend: "bg-purple-100 text-purple-700",
  documentation: "bg-gray-100 text-gray-700",
  feature: "bg-yellow-100 text-yellow-700",
  frontend: "bg-cyan-100 text-cyan-700",
  devops: "bg-orange-100 text-orange-700",
  bug: "bg-red-100 text-red-700",
};


