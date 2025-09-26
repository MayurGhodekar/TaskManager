import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = signal<Task[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }

  getTasks() {
    return this.tasks.asReadonly();
  }

  getTasksForProject(projectId: string) {
    return computed(() => this.tasks().filter(task => task.projectId === projectId));
  }

  addTask(task: Omit<Task, 'id'>) {
    const newTask: Task = {
      ...task,
      id: Date.now(),
    };
    this.tasks.update(tasks => [...tasks, newTask]);
    this.saveToLocalStorage();
  }

  updateTask(updatedTask: Task) {
    this.tasks.update(tasks =>
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    this.saveToLocalStorage();
  }

  deleteTask(taskId: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== taskId));
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  private loadFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
  }
}
