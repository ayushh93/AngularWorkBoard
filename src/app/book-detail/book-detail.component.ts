import { Component, OnInit } from '@angular/core';
import { Book } from '../Models/book';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../Services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule,RouterLink],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent implements OnInit {
  book: Book | null | undefined = undefined;

  constructor(private route: ActivatedRoute , 
    private bookService: BookService,
    private router : Router  
  ){}

  ngOnInit(): void {
    const bookId = Number(this.route.snapshot.params['id']);
      this.bookService.GetBookById(bookId).subscribe((data) => 
      {
        if (data) {
          this.book = data; // Book found
        } else {
          this.router.navigate(['/404']); // Redirect to 404 if book not found
        }
      });
  }
}
