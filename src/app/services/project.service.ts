import { Injectable, signal, computed } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects = signal<Project[]>([]);
  public selectedProjectId = signal<string | null>(null);

  public projects_with_tasks = computed(() => {
    // todo: implement task counting
    return this.projects().map(p => ({...p, taskCount: 0}));
  })

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const savedProjects = localStorage.getItem('projects');
      if (savedProjects) {
        this.projects.set(JSON.parse(savedProjects));
      }
      const selectedId = localStorage.getItem('selectedProjectId');
      if (selectedId) {
        this.selectedProjectId.set(JSON.parse(selectedId));
      }
    }
  }

  getProjects() {
    return this.projects.asReadonly();
  }

  selectProject(id: string) {
    this.selectedProjectId.set(id);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('selectedProjectId', JSON.stringify(id));
    }
  }

  getSelectedProjectId() {
    return this.selectedProjectId();
  }

  addProject(project: Omit<Project, 'id'>) {
    const newProject = { ...project, id: Date.now().toString() };
    this.projects.set([...this.projects(), newProject]);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('projects', JSON.stringify(this.projects()));
    }
  }
}
