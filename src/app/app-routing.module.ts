// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { MemberComponent } from './components/member/member.component';
import { LoanComponent } from './components/loan/loan.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'books', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'members', component: MemberComponent, canActivate: [AuthGuard] },
  { path: 'loans', component: LoanComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
