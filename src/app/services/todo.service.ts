import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AlertService } from './alert.service';

const todos = ['Clean room', 'Cook dinner', 'Clean house', 'Wash dishes'];

interface Todos {
  todo: Array<TodoItem> | any;
  done: Array<TodoItem> | any;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  // Using the behavior Subject to create reactivity
  todos$: BehaviorSubject<Todos> = new BehaviorSubject({ todo: [], done: [] });

  constructor(private alertService: AlertService) {
    const items = this.loadDefaultTodos() as Array<TodoItem>;
    console.log(items);

    this.todos$.next({
      todo: items.filter((t) => !t?.done) || [],
      done: items.filter((t) => t?.done) || [],
    });
  }

  getTodos(): Observable<Todos> {
    return this.todos$.asObservable();
  }

  postTodo(todoItem: string): Observable<any> {
    if (!todoItem) {
      const errorResponse = {
        status: 400,
        message: `Bad request`,
      };
      return of(errorResponse);
    }

    const fakeResponse = {
      status: 200,
    };

    const todo = {
      todo: todoItem,
      id: uuidv4(),
      done: false,
    };

    const todos = this.todos$.value;
    todos.todo.push(todo);
    this.todos$.next(todos);

    if (fakeResponse.status === 200) {
      this.alertService.setAlert({
        type: 'create',
        message: `Todo ${todoItem} created`,
      });
    }

    return of(fakeResponse);
  }

  patchTodo(id: string, status: boolean): Observable<any> {
    if (!id) {
      const errorResponse = {
        status: 400,
        message: `Bad request`,
      };

      throw throwError(() => errorResponse);
    }

    const fakeResponse = {
      status: 201,
    };

    // update todo status that matches id
    const todo: TodoItem | undefined = this.getTodo(id);

    if (!todo) {
      const errorResponse = {
        status: 404,
        message: `Todo not found`,
      };
      return of(errorResponse);
    }
    todo.done = status;

    // update todo list
    const todos = this.todos$.value;
    this.handleChange(id, status, todo, todos);

    return of(fakeResponse);
  }

  deleteTodo(id: string): Observable<any> {
    if (!id) {
      const errorResponse = {
        status: 400,
        message: `Bad request`,
      };
      return of(errorResponse);
    }

    const todo = this.getTodo(id);

    if (!todo) {
      const errorResponse = {
        status: 404,
        message: `Todo not found`,
      };
      return of(errorResponse);
    }

    this.handleDelete(id);

    const fakeResponse = {
      status: 204,
    };

    if (fakeResponse.status === 204) {
      this.alertService.setAlert({
        message: `Item "${todo.todo}" deleted with success.`,
        type: 'delete',
      });
    }

    return of(fakeResponse);
  }

  loadDefaultTodos(): Array<TodoItem> {
    const items = todos?.map((t, index) => ({
      todo: t,
      id: uuidv4(),
      done: index % 2 === 0,
    })) as Array<TodoItem>;

    console.log(items);

    return items;
  }

  getTodo(id: string): TodoItem | undefined {
    const todo =
      this.todos$.value.todo.find((t: TodoItem) => t.id === id) ||
      this.todos$.value.done.find((t: TodoItem) => t.id === id);
    return todo || undefined;
  }

  handleChange(
    id: string,
    status: boolean,
    todo: TodoItem,
    todos: Todos
  ): void {
    const todoList = todos.todo.filter((t: TodoItem) => t.id !== id);
    const doneList = todos.done.filter((t: TodoItem) => t.id !== id);

    console.log({ todoList, doneList, todo });

    if (status) {
      // move to done
      doneList.push(todo);
    } else {
      // move to todo
      todoList.push(todo);
    }

    this.todos$.next({
      done: doneList,
      todo: todoList,
    });
  }

  handleDelete(id: string): void {
    const todo = this.getTodo(id);

    if (!todo) {
      return;
    }

    const todos = this.todos$.value;
    const todoList = todos.todo.filter((t: TodoItem) => t.id !== id);
    const doneList = todos.done.filter((t: TodoItem) => t.id !== id);

    this.todos$.next({
      todo: todoList,
      done: doneList,
    });
  }
}
