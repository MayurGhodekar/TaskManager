import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { RouterLink } from '@angular/router';

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
  public projects = this.projectService.getProjects();

  selectProject(projectId: string) {
    this.projectService.selectProject(projectId);
  }
}
