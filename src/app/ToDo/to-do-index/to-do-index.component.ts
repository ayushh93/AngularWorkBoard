import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToDo } from '../../Models/ToDo';
import { ToDoService } from '../../Services/to-do.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do-index',
  imports: [RouterLink,CommonModule],
  templateUrl: './to-do-index.component.html',
  styleUrl: './to-do-index.component.scss'
})
export class ToDoIndexComponent implements OnInit {
  constructor(private toDoService: ToDoService, private router: Router) { }

  todos: ToDo[] = [];
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadToDos();
  }
  private loadToDos(): void {

    this.toDoService.getAllToDos().subscribe({
      next: (response) => {
        this.todos = response.todos; // Map API response to `todos` array
      },
      error: (error) => {
        this.errorMessage = 'Failed to load ToDos. Please try again.';
        console.error(error);
      },
    });
  }
  Edit(arg0: number) {
    throw new Error('Method not implemented.');
    }
    ViewDetails(id: number) {
    this.router.navigate(['/to-dos', id]);
    }
}
