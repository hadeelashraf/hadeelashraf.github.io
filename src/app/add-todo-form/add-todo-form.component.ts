import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Todo } from '../shared/models/todo.model';
import { AuthService } from '../shared/services/auth.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss']
})
export class AddTodoFormComponent implements OnInit {
  showValidationErrors: boolean = false;
  userId: number = 0;
  
  constructor(private dataService: DataService, 
    private authService: AuthService) {
      this.userId = this.authService.getUserId();  
  }

  ngOnInit(): void {
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return this.showValidationErrors = true;

    let todo: Todo = {
      text: form.value.text, 
      completed: false, 
      date: new Date(), 
      userId: this.userId
    }; 

    this.dataService.addTodo(todo).subscribe((result: any) => {
      if(result){
        this.dataService.todoAdded.emit(); 
        this.showValidationErrors = false
        form.reset()
      }
      
    })
    
    return;
  }

}
