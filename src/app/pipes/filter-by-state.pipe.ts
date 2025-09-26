import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'filterByState',
  standalone: true
})
export class FilterByStatePipe implements PipeTransform {
  transform(tasks: Task[], state: 'To Do' | 'In Progress' | 'Done'): Task[] {
    return tasks.filter(task => task.state === state);
  }
}
