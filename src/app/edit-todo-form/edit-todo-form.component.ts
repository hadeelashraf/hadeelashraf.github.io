import { Component, Inject, OnInit, Optional } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../shared/models/todo.model';

@Component({
  selector: 'app-edit-todo-form',
  templateUrl: './edit-todo-form.component.html',
  styleUrls: ['./edit-todo-form.component.scss']
})
export class EditTodoFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditTodoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo,
    ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }
  
  onFormSubmit(form: NgForm) {
    if (form.invalid) return;
    
    const updatedTodo: Todo = {
      text: form.value.text,
      completed: this.todo.completed, 
      date: this.todo.date, 
      userId: this.todo.userId, 
      id: this.todo.id
    }
    
    this.dialogRef.close(updatedTodo);
  }
}
