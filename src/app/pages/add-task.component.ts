import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { TaskPriority, Assignee } from '../models/task.model';

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

  public priorities = Object.values(TaskPriority);
  public assignees = signal<Assignee[]>([
    { name: 'John Doe', avatar: 'assets/avatar1.png' },
    { name: 'Jane Smith', avatar: 'assets/avatar2.png' },
    { name: 'Peter Jones', avatar: 'assets/avatar3.png' },
  ]);

  public taskForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    projectId: [this.projectService.selectedProjectId(), Validators.required],
    priority: [TaskPriority.Medium, Validators.required],
    dueDate: ['', Validators.required],
    assignee: [null, Validators.required]
  });

  addTask() {
    if (this.taskForm.valid) {
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
}
