import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  declarations: [TodoItemComponent, TodoInputComponent],
  exports: [TodoItemComponent, TodoInputComponent],
})
export class ComponentsModule {}
