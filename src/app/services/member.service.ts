import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private members: Member[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: new Date('2020-01-15') },
    { id: 2, name: 'Jane Smith', email: 'jane@mail.com', joinDate: new Date('2021-03-22') },
    { id: 3, name: 'Moussa Bammou', email: 'moussa@gmail.com', joinDate: new Date('2019-05-27') },
  ];
  private nextId = 4;

  getMembers(): Member[] {
    return this.members;
  }

  addMember(member: Member): void {
    const existingMember = this.members.find(m => m.id === member.id);
    if (!existingMember) {
      member.id = this.nextId++;
      this.members.push(member);
    } else {
      console.error('Member with this ID already exists');
    }
  }

  updateMember(member: Member): void {
    const index = this.members.findIndex(m => m.id === member.id);
    if (index !== -1) {
      this.members[index] = member;
    } else {
      console.error('Member not found');
    }
  }

  deleteMember(id: number): void {
    this.members = this.members.filter(member => member.id !== id);
  }
}
