import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  members: Member[] = [];
  newMember: Member = { id: 0, name: '', email: '', joinDate: new Date() };
  selectedMember: Member | null = null;

  constructor(private memberService: MemberService) {
    console.log('MemberComponent constructor');
   }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.members = this.memberService.getMembers();
  }

  addMember(): void {
    this.memberService.addMember(this.newMember);
    this.newMember = { id: 0, name: '', email: '', joinDate: new Date() };
    this.loadMembers();
  }

  selectMember(member: Member): void {
    this.selectedMember = { ...member };
  }

  updateMember(): void {
    if (this.selectedMember) {
      this.memberService.updateMember(this.selectedMember);
      this.selectedMember = null;
      this.loadMembers();
    }
  }

  deleteMember(id: number): void {
    this.memberService.deleteMember(id);
    this.loadMembers();
  }
}

