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
  done = new EventEmitter<boolean>();

  @Output()
  delete = new EventEmitter<string>();

  onChange(): void {
    this.done.emit(!this.todo.done);
  }

  deleteTodo(): void {
    this.delete.emit(this.todo.id);
  }
}
