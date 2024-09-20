import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    { id: 1, title: 'Angular for Beginners', author: 'John Doe', publishedDate: new Date('2020-01-01'), available: true },
    { id: 2, title: 'Advanced Angular', author: 'Jane Smith', publishedDate: new Date('2021-05-15'), available: false }
  ];
  private nextId = 3; // Suivi de l'ID suivant à utiliser

  constructor() {
    console.log('BookService constructor');
  }

  getBooks(): Book[] {
    return this.books;
  }

  searchBooksByTitle(keyword: string): Book[] {
    keyword = keyword.toLowerCase();
    return this.books.filter(book => book.title.toLowerCase().includes(keyword));
  }

  filterBooksByAvailability(available: boolean): Book[] {
    return this.books.filter(book => book.available === available);
  }

  addBook(book: Book): void {
    const existingBook = this.books.find(b => b.id === book.id);
    if (!existingBook) {
      book.id = this.nextId++;
      this.books.push(book);
    } else {
      console.error('Book with this ID already exists');
    }
  }

  updateBook(updatedBook: Book): void {
    const index = this.books.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = updatedBook;
    } else {
      console.error('Book not found');
    }
  }

  deleteBook(bookId: number): void {
    this.books = this.books.filter(book => book.id !== bookId);
  }
}
