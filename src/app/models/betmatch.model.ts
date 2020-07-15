import { MatchModel } from './match.model';

export class BetMatch {
    id: number;
    user_id: number;
    ticket_id: number;
    match_id: number;
    tip: string | null;
    createdAt: Date;
    updatedAt: Date;
    matchId: number;
    ticketId: number;
    match: MatchModel;
}

export class BetMatchCreate {
    ticket_id: number;
    match_id: number;
}