import { H2HModel } from './h2h.model';
import { TotalsModel } from './totals.model';
import { SpreadsModel } from './spreads.model';

export class MatchModel {
    id: number;
    home_team: string;
    away_team: string;
    commence_time: string;
    sport_key: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    sportKey: string;
    h2hs?: H2HModel[];
    totals?: TotalsModel[];
    spreads?: SpreadsModel[];
}