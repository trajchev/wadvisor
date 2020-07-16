import { oddTypes } from './odd.types';
import { position } from './position';
import { SiteModel } from './site.model';

export class TotalsModel {
    id: number;
    type: oddTypes;
    position_over: position;
    position_under: position;
    odds_home: number;
    odds_away: number;
    points_home: number;
    points_away: number;
    match_id: number;
    site_id: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    matchId: number;
    siteId: number;
    site: SiteModel
}