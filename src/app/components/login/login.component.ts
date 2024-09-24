import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) { 
    console.log('LoginComponent constructor');
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Connexion réussie
        localStorage.setItem('currentUser', JSON.stringify({ username: this.username }));
        
        // Récupérer l'URL de retour ou rediriger vers /books
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/books';
        this.router.navigate([returnUrl]);
      },
      error: (error) => {
        // Gestion d'erreur de connexion
        this.errorMessage = 'Identifiants invalides.';
      }
    });
  }
}
