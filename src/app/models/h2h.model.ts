import { oddTypes } from './odd.types';
import { SiteModel } from './site.model';

export class H2HModel {
    id: number;
    type: oddTypes;
    odds_home: number;
    odds_draw: number;
    odds_away: number;
    match_id: number;
    site_id: number;
    createdAt: Date | string;
    updatedAt: Date | string;
    matchId: number;
    siteId: number;
    site: SiteModel
}