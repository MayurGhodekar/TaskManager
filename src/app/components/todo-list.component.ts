import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ToDoItemComponent } from './todo-item.component';
import { ToDo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  template: `
    <div class="todo-container">
    <h1>To-Do List</h1>
    <input #todoInput (keyup.enter)="addTodo(todoInput.value); todoInput.value = ''" placeholder="Add a new to-do">
    @for (todo of todos(); track todo.id) {
      <app-todo-item 
        [todo]="todo" 
        (delete)="deleteTodo(todo.id)" 
        (toggle)="toggleTodo(todo.id)" 
      />
    }
    </div>
  `,
  styles: [`
   .todo-container {
      max-width: 600px;
      margin: 30px auto;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: #f9f9f9;
    }
  `],
  imports: [ToDoItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent {
  private todoService = inject(TodoService);
  todos = this.todoService.todosSignal;

  addTodo(text: string) {
    if (text.trim()) {
      this.todoService.addTodo(text);
    }
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }
}
