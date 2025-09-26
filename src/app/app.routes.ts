import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'projects', loadComponent: () => import('./pages/project-list').then(m => m.ProjectListComponent) },
  { path: 'add-project', loadComponent: () => import('./pages/add-project.component').then(m => m.default) },
  { path: 'tasks', loadComponent: () => import('./pages/task-list.component').then(m => m.TaskListComponent) },
  { path: 'add-task', loadComponent: () => import('./pages/add-task.component').then(m => m.AddTaskComponent) },
  { path: 'reporting', loadComponent: () => import('./pages/reporting.component').then(m => m.ReportingComponent) },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
