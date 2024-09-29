import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('currentUser', JSON.stringify({ username: this.username }));
        
        // Redirection directe vers la page /books après connexion réussie
        this.router.navigate(['/books']);
      },
      error: (error) => {
        this.errorMessage = 'Identifiants invalides.';
      }
    });
  }
}
