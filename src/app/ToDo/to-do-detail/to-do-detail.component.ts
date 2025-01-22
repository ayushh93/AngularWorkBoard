import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../../Services/to-do.service';
import { ToDo } from '../../Models/ToDo';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do-detail',
  imports: [CommonModule,RouterLink],
  templateUrl: './to-do-detail.component.html',
  styleUrl: './to-do-detail.component.scss'
})
export class ToDoDetailComponent implements OnInit {
  constructor(private toDoService: ToDoService, private router : Router,private route: ActivatedRoute){ }

  toDo: ToDo | undefined;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.LoadToDo();
  }
  LoadToDo() {
    const id = this.route.snapshot.params['id'];
    this.toDoService.getToDoById(id).subscribe({
      next: (response) => {
        this.toDo = response;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load ToDo. Please try again.';
        console.error(error);
      },
    });
  }

}
