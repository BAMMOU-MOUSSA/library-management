import { Injectable } from '@angular/core';
import { Loan } from '../models/loan.model';
import { BookService } from './book.service';
import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private loans: Loan[] = [
    {
      id: 1,
      book: { id: 1, title: 'Angular pour les Débutants', author: 'John Doe', publishedDate: new Date('2020-01-01'), available: false },
      member: { id: 1, name: 'Naguib Mahfouz', email: 'naguib.mahfouz@example.com', joinDate: new Date('2024-09-05') },
      loanDate: new Date('2024-09-15'),
      returnDate: null
    },
    {
      id: 2,
      book: { id: 2, title: 'Advanced Angular', author: 'Jane Smith', publishedDate: new Date('2021-05-15'), available: false },
      member: { id: 2, name: 'Ghada Al-Samman', email: 'ghada.alsamman@mail.com', joinDate: new Date('2024-09-10') },
      loanDate: new Date('2024-09-12'),
      returnDate: null
    }
  ];

  private nextId = 3;  

  constructor(
    private bookService: BookService,
    private memberService: MemberService
  ) {}

  getLoans(): Loan[] {
    return this.loans;
  }

  addLoan(loan: Loan): void {
    const book = this.bookService.getBooks().find(b => b.id === loan.book.id);
    const member = this.memberService.getMembers().find(m => m.id === loan.member.id);

    if (book && member && book.available) {
      loan.id = this.nextId++;
      this.loans.push(loan);
      book.available = false;
      this.bookService.updateBook(book);
    } else {
      console.error('Book not available or member not found.');
    }
  }

  returnBook(loanId: number): void {
    const loan = this.loans.find(l => l.id === loanId);
    if (loan) {
      loan.returnDate = new Date();
      const book = this.bookService.getBooks().find(b => b.id === loan.book.id);
      if (book) {
        book.available = true;
        this.bookService.updateBook(book);
      }
    } else {
      console.error('Loan not found');
    }
  }
}
