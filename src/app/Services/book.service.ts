import { Injectable } from '@angular/core';
import { Book } from '../Models/book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  private books: Book[] =
  [
    { id: 1, name: 'Angular for Beginners', authors: ['John Doe'], priceForNepal: 500, priceForIndia: 300, publication: 'Tech Books' },
    { id: 2, name: 'Mastering Angular', authors: ['Jane Smith'], priceForNepal: 700, priceForIndia: 400, publication: 'Dev Press' },
    // Dummy data
  ];

  //Get all books
  GetBooks():Observable<Book[]>
  {
    return of(this.books);
  }

  //Get book by id
  GetBookById(id:number):Observable<Book | undefined>
  {
    return of(this.books.find(x => x.id === id));
  }

  //Add new book
  AddBook(book:Book): void
  {
    this.books.push(book);
  }
}
