import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = 'http://localhost:8081/api/books';

  constructor(private http: HttpClient) { }

  // Récupérer tous les livres
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  // Récupérer un livre par ID
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  // Ajouter un nouveau livre
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  // Mettre à jour un livre existant
  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${book.id}`, book);
  }

  // Supprimer un livre par ID
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Rechercher des livres par titre
  searchBooksByTitle(keyword: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}?title=${encodeURIComponent(keyword)}`);
  }

  // Filtrer les livres par disponibilité
  filterBooksByAvailability(available: boolean): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}?available=${available}`);
  }
}
