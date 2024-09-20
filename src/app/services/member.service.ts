import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private members: Member[] = [
    { id: 1, name: 'Naguib Mahfouz', email: 'naguib.mahfouz@example.com', joinDate: new Date('2024-09-05') },
    { id: 2, name: 'Ghada Al-Samman', email: 'ghada.alsamman@mail.com', joinDate: new Date('2024-09-10') },
    { id: 3, name: 'Taha Hussein', email: 'taha.hussein@gmail.com', joinDate: new Date('2024-09-15') },
    { id: 4, name: 'Fatima Al-Fihri', email: 'fatima.fihri@example.com', joinDate: new Date('2024-09-12') },
    { id: 5, name: 'Omar Khayyam', email: 'omar.khayyam@mail.com', joinDate: new Date('2024-09-14') },
    { id: 6, name: 'Leila Khaled', email: 'leila.khaled@gmail.com', joinDate: new Date('2024-09-11') },
    { id: 7, name: 'Hassan Nasrallah', email: 'hassan.nasrallah@example.com', joinDate: new Date('2024-09-09') },
    { id: 8, name: 'Amina Wadud', email: 'amina.wadud@mail.com', joinDate: new Date('2024-09-13') },
    { id: 9, name: 'Rami Malek', email: 'rami.malek@gmail.com', joinDate: new Date('2024-09-06') },
    { id: 10, name: 'Yasmin Abdel Aziz', email: 'yasmin.abdelaziz@example.com', joinDate: new Date('2024-09-08') },
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
