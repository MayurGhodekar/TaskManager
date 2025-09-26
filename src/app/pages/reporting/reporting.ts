import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-reporting',
  imports: [CommonModule],
  templateUrl: './reporting.html',
  styleUrls: ['./reporting.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportingComponent implements AfterViewInit {
  @ViewChild('chart') chartRef!: ElementRef<HTMLCanvasElement>;
  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);
  private tasks = this.taskService.getTasksForProject(this.projectService.selectedProjectId() || '');

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const completedTasks = this.tasks().filter((task: Task) => task.state === 'Done');
    const taskCountsByDate = completedTasks.reduce((acc: Record<string, number>, task: Task) => {
      const date = new Date(task.completedAt!).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: Object.keys(taskCountsByDate),
        datasets: [{
          label: 'Completed Tasks',
          data: Object.values(taskCountsByDate),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }
}
