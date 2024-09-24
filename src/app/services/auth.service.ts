import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth/login'; // URL de l'API

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  login(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post(this.apiUrl, user, { responseType: 'text' });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
  }

  isAuthenticatedUser(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('currentUser') !== null;
    }
    return false;
  }

  // Appeler cette méthode pour stocker les informations de l'utilisateur
  setCurrentUser(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', 'true'); // ou stocker un jeton JWT
    }
  }
}
