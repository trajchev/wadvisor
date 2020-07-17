import { BetMatch } from './betmatch.model';

export class TicketModel {
    id: number;
    title: string;
    description?: string;
    user_id: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    userId: number;
    betmatches?: BetMatch[]
}

export class TicketModelCreate {
    title: string;
    description: string;
}