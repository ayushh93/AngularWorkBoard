import { Component, OnInit } from '@angular/core';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule,RouterLink],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.bookService.GetBooks().subscribe((data) => {
      this.books = data;
    })
  }

  EditBook(bookId: number) {
    this.router.navigate(['/books/edit', bookId]);

  }
  ViewDetails(bookId: number) {
    this.router.navigate(['/books', bookId]);
  }

}
