import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../services/project.service';
import { Task } from '../models/task.model';
import { FilterByStatePipe } from '../pipes/filter-by-state.pipe';
import { RouterLink } from '@angular/router';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FilterByStatePipe, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);
  
  public tasks = computed(() => {
    const selectedProjectId = this.projectService.selectedProjectId();
    if (!selectedProjectId) return [];
    return this.taskService.getTasksForProject(selectedProjectId)();
  });

  updateTaskState(task: Task, state: 'To Do' | 'In Progress' | 'Done') {
    const completedAt = state === 'Done' ? Date.now() : undefined;
    this.taskService.updateTask({ ...task, state, completedAt });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }
}
