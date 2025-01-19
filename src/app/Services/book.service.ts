import { Injectable } from '@angular/core';
import { Book } from '../Models/book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [
    { id: 1, name: 'Angular for Beginners', authors: ['John Doe', 'Jane Smith'], priceForNepal: 500, priceForIndia: 300, publication: 'Tech Books' },
    { id: 2, name: 'Mastering Angular', authors: ['Jane Smith'], priceForNepal: 700, priceForIndia: 400, publication: 'Dev Press' },
    // Dummy data
  ];

  private nextId: number = this.books.length + 1; // To generate unique IDs for new books

  // Get all books
  GetBooks(): Observable<Book[]> {
    return of(this.books);
  }

  // Get book by ID
  GetBookById(id: number): Observable<Book | undefined> {
    return of(this.books.find((x) => x.id === id));
  }

  // Add a new book
  AddBook(book: Book): Observable<void> {
    book.id = this.nextId++; // Assign a unique ID to the new book
    this.books.push(book);
    return of(); // Return an observable for consistency
  }

  // Update an existing book (delete and add new updated book)
  UpdateBook(updatedBook: Book): Observable<void> {
    const index = this.books.findIndex((x) => x.id === updatedBook.id);

    console.log('Found index:', index);
    if (index !== -1) {
      this.books.splice(index, 1); // Remove the old book
      this.books.push(updatedBook); // Add the updated book
      return of(); // Return an observable for consistency
    } else {
      console.error('Book not found with id:', updatedBook.id);
      return of();
    }
  }

  // Convert price between INR and NPR
  ConvertPrice(price: number, fromCurrency: 'INR' | 'NPR', toCurrency: 'INR' | 'NPR'): number {
    const conversionRate = 1.6;

    if (fromCurrency === toCurrency) {
      return price; // No conversion needed
    }

    let convertedPrice = price;

    if (fromCurrency === 'INR' && toCurrency === 'NPR') {
      convertedPrice = price * conversionRate; // Convert INR to NPR
    }

    if (fromCurrency === 'NPR' && toCurrency === 'INR') {
      convertedPrice = price / conversionRate; // Convert NPR to INR
    }

   // Round to 2 decimal places and return as a number
   return Math.round(convertedPrice * 100) / 100;
  }
}