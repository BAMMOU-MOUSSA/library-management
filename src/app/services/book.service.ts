import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    { id: 1, title: 'Les fondements du droit civil', author: 'Abd al-Razzaq al-Sanhuri', publishedDate: new Date('1949-06-15'), available: true },
    { id: 2, title: 'Introduction à l’algèbre commutative', author: 'Jean-Pierre Serre', publishedDate: new Date('1965-04-10'), available: false },
    { id: 3, title: 'La biologie des croyances', author: 'Bruce H. Lipton', publishedDate: new Date('2005-10-01'), available: true },
    { id: 4, title: 'La philosophie islamique', author: 'Muhammad Abed al-Jabri', publishedDate: new Date('1984-09-20'), available: false },
    { id: 5, title: 'La vérité sur l’affaire Harry Quebert', author: 'Joël Dicker', publishedDate: new Date('2012-09-19'), available: true },
    { id: 6, title: 'L’Étranger', author: 'Albert Camus', publishedDate: new Date('1942-05-19'), available: true },
    { id: 7, title: 'L’Encyclopédie de la médecine', author: 'Ibn Sina (Avicenne)', publishedDate: new Date('1025-01-01'), available: true },
    { id: 8, title: 'Le guide des égarés', author: 'Maimonide', publishedDate: new Date('1190-01-01'), available: false },
    { id: 9, title: 'Un homme sans loi', author: 'Tahar Ben Jelloun', publishedDate: new Date('2017-03-15'), available: true },
    { id: 10, title: 'Le capital au XXIe siècle', author: 'Thomas Piketty', publishedDate: new Date('2013-08-25'), available: true }
  ];
  
  private nextId = 11; // Suivi de l'ID suivant à utiliser

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
