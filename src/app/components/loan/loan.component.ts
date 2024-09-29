import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../models/loan.model';
import { Book } from '../../models/book.model';
import { Member } from '../../models/member.model';
import { BookService } from '../../services/book.service';
import { MemberService } from '../../services/member.service';
@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loans: Loan[] = [];
  books: Book[] = [];
  members: Member[] = [];
  newLoan: { book: { id: number }, member: { id: number } } = { book: { id: 0 }, member: { id: 0 } };
  constructor(
    private loanService: LoanService,
    private bookService: BookService,
    private memberService: MemberService
  ) {}
  ngOnInit(): void {
    this.loadLoans();
    this.loadBooks();
    this.loadMembers();
  }
  loadLoans(): void {
    this.loanService.getLoans().subscribe({
      next: (data: Loan[]) => this.loans = data,
      error: (err) => console.error('Erreur lors du chargement des emprunts', err)
    });
  }
  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => this.books = data,
      error: (err) => console.error('Erreur lors du chargement des livres', err)
    });
  }
  loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (data: Member[]) => this.members = data,
      error: (err) => console.error('Erreur lors du chargement des membres', err)
    });
  }
  addLoan(): void {
    const bookId = this.newLoan.book.id;
    const memberId = this.newLoan.member.id;

    if (bookId && memberId) {
      const book = this.books.find(b => b.id === bookId);
      const member = this.members.find(m => m.id === memberId);

      if (book && member) {
        if (book.available) {
          const loan: Loan = {
            id: 0,
            book: book,
            member: member,
            loanDate: new Date(),
            returnDate: null
          };
          this.loanService.addLoan(loan).subscribe({
            next: () => {
              this.loadLoans();
              this.newLoan = { book: { id: 0 }, member: { id: 0 } };
            },
            error: (err) => console.error('Erreur lors de l\'ajout de l\'emprunt', err)
          });
        } else {
          alert('Livre non disponible.');
        }
      } else {
        alert('Livre ou membre non trouvé.');
      }
    } else {
      alert('Veuillez sélectionner un livre et un membre.');
    }
  }
  returnBook(loanId: number): void {
    this.loanService.returnBook(loanId);
    this.loadLoans(); // Recharger la liste des emprunts après le retour
  }
}
