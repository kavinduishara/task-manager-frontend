export interface UserDetails {
  _id: string;
  name: string;
  email: string;
  profile:string|undefined;
  role: 'ADMIN' | 'USER'; // Expand roles if you have more types
}

export interface LoginResponse {
  message: string;
  user: UserDetails;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  flag: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'; // Expand based on your workflow status
  creator: string;
  assignee: string;
  dueDate: string; // ISO date string
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiResponseData {
  user: UserDetails;
  tasks: Task[];
}

export interface GetUserDetailsResponse {
  message: string;
  data: ApiResponseData;
}
