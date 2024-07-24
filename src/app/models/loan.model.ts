import { Book } from './book.model';
import { Member } from './member.model';

export class Loan {
    constructor(
        public id: number,
        public book: Book,
        public member: Member,
        public loanDate: Date,
        public returnDate: Date | null
    ) {}
}
