import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ToDo } from '../models/todo.model';

@Component({
  selector: 'app-todo-item',
  template: `
    <div [class.completed]="todo().completed">
      <span (click)="toggle.emit()">{{ todo().text }}</span>
      <button (click)="delete.emit()">Delete</button>
    </div>
  `,
  styles: [`
    .completed {
      text-decoration: line-through;
    }
    div {
      display: flex;
      justify-content: space-between;
      padding: 5px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemComponent {
  todo = input.required<ToDo>();
  delete = output<void>();
  toggle = output<void>();
}
