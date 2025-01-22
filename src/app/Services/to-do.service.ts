import { Injectable } from '@angular/core';
import { ToDo } from '../Models/ToDo';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private baseUrl = 'https://dummyjson.com/todos';

  constructor(private http: HttpClient) {}

  // Get all ToDos
  getAllToDos(): Observable<{ todos: ToDo[] }> {
    return this.http.get<{ todos: ToDo[] }>(this.baseUrl);
  }

  // Get ToDo by ID
  getToDoById(id: number): Observable<ToDo> {
    return this.http.get<ToDo>(`${this.baseUrl}/${id}`);
  }

  // Create a new ToDo
  createToDo(newToDo: Partial<ToDo>): Observable<ToDo> {
    return this.http.post<ToDo>(this.baseUrl, newToDo, {
      headers: this.getCustomHeaders(),
    });
  }

  // Update an existing ToDo
  updateToDo(id: number, updatedToDo: Partial<ToDo>): Observable<ToDo> {
    return this.http.put<ToDo>(`${this.baseUrl}/${id}`, updatedToDo, {
      headers: this.getCustomHeaders(),
    });
  }

  // Delete a ToDo
  deleteToDo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getCustomHeaders(),
    });
  }

  // Add custom headers (e.g., x-api-key or authorization token)
  private getCustomHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-api-key': 'your-api-key-here', // Replace with your actual key or token
    });
  }
}
