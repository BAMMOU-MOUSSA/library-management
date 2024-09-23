import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';

@Injectable({
    providedIn: 'root'
  })
  export class LoanService {
    private baseUrl = 'http://localhost:8081/api/loans';
  
    constructor(private http: HttpClient) {}
  
    getLoans(): Observable<Loan[]> {
      return this.http.get<Loan[]>(this.baseUrl);
    }
  
    addLoan(loan: Loan): Observable<Loan> {
      return this.http.post<Loan>(this.baseUrl, loan);
    }
  
    deleteLoan(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
  
    returnBook(loanId: number): void {
      this.deleteLoan(loanId).subscribe(() => {
        console.log(`Loan with ID ${loanId} returned`);
      });
    }
  }
  