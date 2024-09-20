import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { BookService } from '../../services/book.service';
import { MemberService } from '../../services/member.service';
import { Loan } from '../../models/loan.model';
import { Book } from '../../models/book.model';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loans: Loan[] = [];
  newLoan: { book: { id: number }, member: { id: number } } = { book: { id: 0 }, member: { id: 0 } };

  constructor(
    private loanService: LoanService,
    private bookService: BookService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.loans = this.loanService.getLoans();
  }

  addLoan(): void {
    const book = this.bookService.getBooks().find(b => b.id === this.newLoan.book.id);
    const member = this.memberService.getMembers().find(m => m.id === this.newLoan.member.id);

    if (book && member && book.available) {
      const loan: Loan = {
        id: 0, // L'ID sera géré par le service LoanService
        book: book,
        member: member,
        loanDate: new Date(),
        returnDate: null
      };
      this.loanService.addLoan(loan);
      this.loadLoans();
      this.newLoan = { book: { id: 0 }, member: { id: 0 } }; // Réinitialiser le formulaire
    } else {
      alert('Livre non disponible ou membre non trouvé.');
    }
  }

  returnBook(loanId: number): void {
    this.loanService.returnBook(loanId);
    this.loadLoans();
  }
}
