import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from '../models/alert';
import { AlertService } from '../services/alert.service';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  todos$ = this.todoService.getTodos();
  feedback$: Observable<Alert> = this.alertService.getAlert();

  constructor(
    private todoService: TodoService,
    private alertService: AlertService
  ) {}

  onDelete(id: string): void {
    this.todoService.deleteTodo(id);
  }

  onCreate(todoItem: string): void {
    this.todoService.postTodo(todoItem);
  }

  onChange(todoInfo: { id: string; status: boolean }): void {
    console.log(todoInfo);
    const { id, status } = todoInfo;
    this.todoService.patchTodo(id, status);
  }
}
