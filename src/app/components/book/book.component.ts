import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  searchKeyword: string = '';
  showAvailableOnly: boolean = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.books = this.bookService.getBooks();
  }

  searchBooks(): void {
    this.books = this.bookService.searchBooksByTitle(this.searchKeyword);
  }

  toggleAvailabilityFilter(): void {
    if (this.showAvailableOnly) {
      this.books = this.bookService.filterBooksByAvailability(true);
    } else {
      this.loadBooks();
    }
  }
}
