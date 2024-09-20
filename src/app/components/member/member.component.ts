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

  // Propriétés temporaires pour le formulaire
  tempName: string = '';
  tempEmail: string = '';
  tempJoinDate: Date = new Date();

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.members = this.memberService.getMembers();
  }

  addMember(): void {
    this.newMember.name = this.tempName;
    this.newMember.email = this.tempEmail;
    this.newMember.joinDate = this.tempJoinDate;

    this.memberService.addMember(this.newMember);
    this.resetForm();
    this.loadMembers();
  }

  selectMember(member: Member): void {
    this.selectedMember = { ...member };
    this.tempName = member.name;
    this.tempEmail = member.email;
    this.tempJoinDate = member.joinDate;
  }

  updateMember(): void {
    if (this.selectedMember) {
      this.selectedMember.name = this.tempName;
      this.selectedMember.email = this.tempEmail;
      this.selectedMember.joinDate = this.tempJoinDate;

      this.memberService.updateMember(this.selectedMember);
      this.resetForm();
      this.loadMembers();
    }
  }

  deleteMember(id: number): void {
    this.memberService.deleteMember(id);
    this.loadMembers();
  }

  resetForm(): void {
    this.tempName = '';
    this.tempEmail = '';
    this.tempJoinDate = new Date();
    this.selectedMember = null;
  }
}
