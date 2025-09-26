import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { TaskPriority, Assignee } from '../models/task.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTaskComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);
  private userService = inject(UserService);

  public priorities = Object.values(TaskPriority);
  public assignees = this.userService.users;
  public projects = this.projectService.getProjects();

  public taskForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    projectId: [this.projectService.selectedProjectId(), Validators.required],
    priority: [TaskPriority.Medium, Validators.required],
    dueDate: ['', Validators.required],
    assignee: [null, Validators.required]
  });

  addTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.taskService.addTask({
      name: this.taskForm.value.name!,
      description: this.taskForm.value.description!,
      projectId: this.taskForm.value.projectId!,
      priority: this.taskForm.value.priority!,
      dueDate: this.taskForm.value.dueDate!,
      assignee: this.taskForm.value.assignee!,
      state: 'To Do'
    });
    this.router.navigate(['/tasks']);
  }
}
