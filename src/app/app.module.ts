import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';  // Ajout pour les services HTTP

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { LoginComponent } from './components/login/login.component';
import { MemberComponent } from './components/member/member.component';
import { LoanComponent } from './components/loan/loan.component';

import { MemberService } from './services/member.service';
import { BookService } from './services/book.service';
import { LoanService } from './services/loan.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    LoginComponent,
    MemberComponent,
    LoanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule // Ajout pour permettre les requêtes HTTP via les services
  ],
  providers: [
    MemberService,
    BookService,
    LoanService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
