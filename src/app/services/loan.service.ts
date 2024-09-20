import { Injectable } from '@angular/core';
import { Loan } from '../models/loan.model';
import { BookService } from './book.service';
import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private loans: Loan[] = [];
  private nextId = 1; // Suivi de l'ID des emprunts

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
      console.error('Book not available or member not found');
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
