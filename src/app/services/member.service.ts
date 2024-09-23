import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private apiUrl = 'http://localhost:8081/api/members'; // Remplace par l'URL appropriée

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.apiUrl);
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.apiUrl, member);
  }

  updateMember(member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}/${member.id}`, member);
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
