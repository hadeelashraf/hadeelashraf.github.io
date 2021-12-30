import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  todos: Todo[] = [];
  // REST API
  endpoint = 'http://localhost:3000/todos';
  public todoAdded: EventEmitter<void> = new EventEmitter()
      
  constructor(private httpClient: HttpClient) { }
  
  httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
  }


  getAllTodos(userId: number): Observable<Todo[]> {
    return this.httpClient.get<any>(`${this.endpoint}?userId=${userId}`);
  }

  addTodo(todo: Todo) {
    return this.httpClient.post<Todo>(this.endpoint, todo, this.httpHeader)
  }

  updateTodo(id: any, updatedTodo: Todo) {
    return this.httpClient.put<Todo>(`${this.endpoint}/${id}`, updatedTodo , this.httpHeader)
  }

  deleteTodo(id: any) {
    return this.httpClient.delete<Todo>(`${this.endpoint}/${id}`, this.httpHeader)
  }
  
}
