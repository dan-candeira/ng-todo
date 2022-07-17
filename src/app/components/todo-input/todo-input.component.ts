import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
})
export class TodoInputComponent {
  todoItem: string;

  @Output()
  submited = new EventEmitter<string>();

  constructor() {}

  add(): void {
    this.submited.emit(this.todoItem);
    this.todoItem = '';
  }
}
