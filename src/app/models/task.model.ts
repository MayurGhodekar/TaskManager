export enum TaskPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export interface Assignee {
  name: string;
  avatar: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  projectId: string;
  state: 'To Do' | 'In Progress' | 'Done';
  priority: TaskPriority;
  dueDate: string;
  assignee: Assignee;
  completedAt?: number;
}
