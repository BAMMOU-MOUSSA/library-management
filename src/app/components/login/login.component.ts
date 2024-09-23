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

  constructor(private authService: AuthService, private router: Router) { 
    console.log('LoginComponent constructor');
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        // Connexion réussie
        localStorage.setItem('currentUser', JSON.stringify({ username: this.username }));
        this.router.navigate(['/books']);
      },
      error => {
        // Erreur de connexion
        this.errorMessage = 'Identifiants invalides.';
      }
    );
  }
}
