import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToDoListComponent } from './components/todo-list.component';

@Component({
  selector: 'app-root',
  imports: [ToDoListComponent],
  template: '<app-todo-list></app-todo-list>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
