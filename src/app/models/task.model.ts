import { User } from "../services/user.service";

export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export type Assignee = User;

export interface Task {
  id: number;
  name: string;
  description: string;
  projectId: string;
  state: 'To Do' | 'In Progress' | 'Done';
  priority: TaskPriority;
  dueDate: string;
  assignee: User;
  completedAt?: number;
}
