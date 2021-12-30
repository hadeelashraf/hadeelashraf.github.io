import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoFormComponent } from '../edit-todo-form/edit-todo-form.component';
import { Todo } from '../shared/models/todo.model';
import { AuthService } from '../shared/services/auth.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = []; 
  userId: number = 0; 

  constructor(
    private dataService: DataService, 
    private authService: AuthService, 
    private dialog: MatDialog) 
    {

     }

  ngOnInit(): void {
    this.getData(); 
    this.dataService.todoAdded.subscribe((result: any) => {
      this.getData();
    })
  }

  getData(){
    if(this.authService.isAuthenticated()){
      this.userId = this.authService.getUserId(); 
      this.dataService.getAllTodos(this.userId).subscribe((result: any) => {
        this.todos = result; 
      })
    }
    
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.dataService.updateTodo(todo.id, todo).subscribe((result)=> {
      this.getData(); 
    })
  }

  editTodo(todo: Todo) {
    let dialogRef = this.dialog.open(EditTodoFormComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateTodo(todo.id, result).subscribe((result) => {
          this.getData();
        })
      }
    })
  }

  deleteTodo(todo: Todo) {
    this.dataService.deleteTodo(todo.id).subscribe((result: any) => {
      this.getData(); 
    })
  }
}
