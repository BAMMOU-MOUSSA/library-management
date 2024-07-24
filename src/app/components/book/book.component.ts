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

  constructor(private bookService: BookService) { 
    console.log('BookComponent constructor');
  }

  ngOnInit(): void {
    console.log('BookComponent ngOnInit');
    this.loadBooks();
  }

  loadBooks(): void {
    console.log('BookComponent ngOnInit');
    this.books = this.bookService.getBooks();
  }

  searchBooks(): void {
    console.log('BookComponent searchBooks method');
    this.books = this.bookService.getBooks().filter(book =>
      book.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

  toggleAvailabilityFilter(): void {
    if (this.showAvailableOnly) {
      this.books = this.bookService.getBooks().filter(book => book.available);
    } else {
      this.loadBooks();
    }
  }
}
