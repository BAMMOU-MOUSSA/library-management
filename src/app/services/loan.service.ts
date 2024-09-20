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
      book: { id: 2, title: 'Introduction à l’algèbre commutative', author: 'Jean-Pierre Serre', publishedDate: new Date('1965-04-10'), available: false},
      member:{ id: 14, name: 'Hanan al-Shaykh', email: 'hanan.al-shaykh@example.com', joinDate: new Date('2024-09-21') },
      loanDate: new Date('2024-09-15'),
      returnDate: null
    },
    {
      id: 2,
      book: { id: 10, title: 'Le capital au XXIe siècle', author: 'Thomas Piketty', publishedDate: new Date('2013-08-25'), available: false   },
      member: { id: 7, name: 'Hassan Nasrallah', email: 'hassan.nasrallah@example.com', joinDate: new Date('2024-09-09') },
      loanDate: new Date('2024-09-12'),
      returnDate: null
    },
    {
      id: 3,
      book: { id: 4, title: 'La philosophie islamique', author: 'Muhammad Abed al-Jabri', publishedDate: new Date('1984-09-20'), available: false },
      member: { id: 3, name: 'Taha Hussein', email: 'taha.hussein@gmail.com', joinDate: new Date('2024-09-15') },
      loanDate: new Date('2024-09-16'),
      returnDate: null
    },
    {
      id: 4,
      book: { id: 1, title: 'Les fondements du droit civil', author: 'Abd al-Razzaq al-Sanhuri', publishedDate: new Date('1949-06-15'), available: false  },
      member: { id: 3, name: 'Taha Hussein', email: 'taha.hussein@gmail.com', joinDate: new Date('2024-09-15')  },
      loanDate: new Date('2024-09-17'),
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
