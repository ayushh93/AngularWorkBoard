import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../Services/book.service';
import { Book } from '../../Models/book';
import { CommonModule } from '@angular/common';
import { Console } from 'console';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm!: FormGroup;
  isEditMode = false;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.params['id']);
    this.isEditMode = !!this.bookId;

    // Initialize the form
    this.bookForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      authors: this.fb.array([this.fb.control('', Validators.required)]),
      priceForNepal: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      priceForIndia: [null, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      publication: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)]],
    });
    // Listen for changes in the priceForNepal field and convert the value
    this.bookForm.get('priceForNepal')?.valueChanges.subscribe((value: number) => {
      const convertedValue = this.bookService.ConvertPrice(value, 'NPR', 'INR');
      this.bookForm.get('priceForIndia')?.setValue(convertedValue, { emitEvent: false }); // Emit false to prevent recursive updates
    });

    // Listen for changes in the priceForIndia field and convert the value
    this.bookForm.get('priceForIndia')?.valueChanges.subscribe((value: number) => {
      const convertedValue = this.bookService.ConvertPrice(value, 'INR', 'NPR');
      this.bookForm.get('priceForNepal')?.setValue(convertedValue, { emitEvent: false }); // Emit false to prevent recursive updates
    });

    if (this.isEditMode && this.bookId) {
      this.bookService.GetBookById(this.bookId).subscribe((book) => {
        if (book) {
          // Patch the main form fields
          this.bookForm.patchValue({
            id: book.id,
            name: book.name,
            priceForNepal: book.priceForNepal,
            priceForIndia: book.priceForIndia,
            publication: book.publication,
          });
          this.authors.clear(); // Clear existing author fields
          book.authors.forEach((author) => {
            this.authors.push(this.fb.control(author, Validators.required));
          });
        }
      });
    }
  }

  // Helper getter for authors FormArray
  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  // Add author field
  addAuthor(): void {
    this.authors.push(this.fb.control('', Validators.required));
  }

  // Remove author field
  removeAuthor(index: number): void {
    if (this.authors.length > 1) {
      this.authors.removeAt(index);
    }
  }

  // Submit form
  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData: Book = this.bookForm.value;
      if (this.isEditMode && this.bookId) {
        this.bookService.UpdateBook(bookData).subscribe(() => {
        });
      } else {
        this.bookService.AddBook(bookData).subscribe(() => {
        });
      }
      this.router.navigate(['/books']);

    } else {
      console.log(this.bookForm.valid);
      // Handle form errors
      this.bookForm.markAllAsTouched();
    }
  }

  // Go back to book list
  goBack(): void {
    this.router.navigate(['/books']);
  }
}