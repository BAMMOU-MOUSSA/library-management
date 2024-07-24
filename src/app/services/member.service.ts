import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private members: Member[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: new Date('2020-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@mail.com', joinDate: new Date('2021-03-22') },
    { id :3, name: 'moussa bammou ', email : 'moussa@gmail.com', joinDate: new Date('2019-05-27')},
  ];

  getMembers(): Member[] {
    return this.members;
  }

  addMember(member: Member): void {
    member.id = this.members.length + 1;
    this.members.push(member);
  }

  updateMember(member: Member): void {
    const index = this.members.findIndex(m => m.id === member.id);
    if (index !== -1) {
      this.members[index] = member;
    }
  }

  deleteMember(id: number): void {
    this.members = this.members.filter(member => member.id !== id);
  }
}
