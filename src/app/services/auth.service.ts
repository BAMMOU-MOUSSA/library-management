import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    console.log('AuthService constructor');
  }

  login(username: string, password: string): boolean {
    // Simulate authentication, replace with actual logic
    if (username === 'admin' && password === 'moussa') {
      this.isAuthenticated = true;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify({ username }));
      }
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
  }

  isAuthenticatedUser(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      return user ? true : false;
    }
    return false;
  }
}
