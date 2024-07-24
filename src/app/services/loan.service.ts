import { Injectable } from '@angular/core';
import { Loan } from '../models/loan.model';
import { BookService } from './book.service';
import { MemberService } from './member.service';

@Injectable({
    providedIn: 'root'
})
export class LoanService {
    private loans: Loan[] = [];

    constructor(
        private bookService: BookService,
        private memberService: MemberService
    ) {}

    getLoans(): Loan[] {
        return this.loans;
    }

    addLoan(loan: Loan): void {
        this.loans.push(loan);
        const book = this.bookService.getBooks().find(b => b.id === loan.book.id);
        if (book) {
            book.available = false;
            this.bookService.updateBook(book);
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
        }
    }
}
