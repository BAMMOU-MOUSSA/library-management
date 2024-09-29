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
  errorMessage: string | null = null;
  newBook: Book = { id: 0, title: '', author: '', publishedDate:new Date, available: true }; // Livre à ajouter

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  // Charger tous les livres
  private loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => this.handleSuccess(data),
      error: (err) => this.handleError('Erreur lors du chargement des livres', err)
    });
  }

  // Rechercher des livres par titre
  searchBooks(): void {
    if (this.searchKeyword.trim()) {
      this.bookService.searchBooksByTitle(this.searchKeyword).subscribe({
        next: (data: Book[]) => this.handleSuccess(data),
        error: (err) => this.handleError('Erreur lors de la recherche de livres', err)
      });
    } else {
      this.loadBooks(); // Recharger tous les livres si le champ de recherche est vide
    }
  }

  // Filtrer les livres par disponibilité
  toggleAvailabilityFilter(): void {
    const filterMethod = this.showAvailableOnly 
      ? this.bookService.filterBooksByAvailability(true) 
      : this.bookService.getBooks();

    filterMethod.subscribe({
      next: (data: Book[]) => this.handleSuccess(data),
      error: (err) => this.handleError('Erreur lors du filtrage des livres', err)
    });
  }

  // Ajouter un nouveau livre
  onAddBook(): void {
    this.bookService.addBook(this.newBook).subscribe({
      next: (book: Book) => {
        this.books.push(book); // Ajouter le nouveau livre à la liste
        this.newBook = { id: 0, title: '', author: '', publishedDate:new Date, available: true }; // Réinitialiser le formulaire
      },
      error: (err) => this.handleError('Erreur lors de l\'ajout du livre', err)
    });
  }

  // Supprimer un livre
  onDeleteBook(bookId: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce livre ?')) {
      this.bookService.deleteBook(bookId).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== bookId); // Supprimer le livre de la liste
        },
        error: (err) => this.handleError('Erreur lors de la suppression du livre', err)
      });
    }
  }

  // Gérer le succès de la requête
  private handleSuccess(data: Book[]): void {
    this.books = data;
    this.errorMessage = null; // Réinitialiser le message d'erreur
  }

  // Gérer les erreurs
  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.errorMessage = message; // Stocker le message d'erreur pour l'affichage
  }
}
