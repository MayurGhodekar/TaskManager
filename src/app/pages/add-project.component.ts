import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-add-project',
  standalone: true,
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AddProjectComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private projectService = inject(ProjectService);

  public projectForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  addProject() {
    if (this.projectForm.valid) {
      this.projectService.addProject(this.projectForm.value as any);
      this.router.navigate(['/projects']);
    }
  }
}
