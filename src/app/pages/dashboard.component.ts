import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private projectService = inject(ProjectService);

  public projects = this.projectService.getProjects();
  public selectedProjectId = this.projectService.selectedProjectId;

  addProject(name: string) {
    if (name) {
      this.projectService.addProject({ name, description: '' });
    }
  }

  selectProject(projectId: string) {
    this.projectService.selectProject(projectId);
  }
}
