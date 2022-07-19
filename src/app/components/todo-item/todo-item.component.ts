import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoItem } from '../../models/todo-item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  host: { class: 'todo' },
})
export class TodoItemComponent {
  @Input()
  todo: TodoItem;

  @Output()
  statusChange = new EventEmitter<{ status: boolean; id: string }>();

  @Output()
  delete = new EventEmitter<string>();

  onChange(e: any): void {
    const status = e.target.checked;
    this.statusChange.emit({ id: this.todo.id, status });
  }

  deleteTodo(): void {
    this.delete.emit(this.todo.id);
  }
}
