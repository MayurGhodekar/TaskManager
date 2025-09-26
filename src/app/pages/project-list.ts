import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListComponent {
  private projectService = inject(ProjectService);
  private router = inject(Router);
  public projects = this.projectService.getProjects();

  selectProject(projectId: string) {
    this.projectService.selectProject(projectId);
    this.router.navigate(['/tasks']);
  }
}
