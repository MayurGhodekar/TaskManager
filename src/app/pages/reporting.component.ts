import { ChangeDetectionStrategy, Component, inject, computed, afterNextRender, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { Chart, registerables, ChartConfiguration } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportingComponent {
  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);
  private chart!: Chart;
  chartCanvas = viewChild.required<ElementRef<HTMLCanvasElement>>('chartCanvas');

  private tasks = computed(() => {
    const selectedProjectId = this.projectService.selectedProjectId();
    if (!selectedProjectId) return [];
    return this.taskService.getTasksForProject(selectedProjectId)();
  });

  private completedTasksByMonth = computed(() => {
    const tasks = this.tasks();
    const completedTasks = tasks.filter(task => task.state === 'Done');
    const taskCountsByDate = completedTasks.reduce((acc, task) => {
      const date = new Date(task.id).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(taskCountsByDate);
    const data = Object.values(taskCountsByDate);
    return { labels, data };
  });

  constructor() {
    afterNextRender(() => {
      this.createChart();
    });
  }

  private createChart() {
    const { labels, data } = this.completedTasksByMonth();
    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: '# of Completed Tasks',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    };
    this.chart = new Chart(this.chartCanvas().nativeElement, chartConfig);
  }
}
