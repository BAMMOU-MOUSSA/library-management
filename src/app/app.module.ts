import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { LoginComponent } from './components/login/login.component';
import { MemberComponent } from './components/member/member.component';
import { MemberService } from './services/member.service';
import { BookService } from './services/book.service';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    LoginComponent,
    MemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [MemberService, BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
