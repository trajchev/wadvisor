import { Component, OnInit, Input } from '@angular/core';

import { H2HModel } from '../../../models/h2h.model';
import { MatchModel } from '../../../models/match.model';
import { SpreadsModel } from '../../../models/spreads.model';
import { TotalsModel } from '../../../models/totals.model';
import { MatchService } from '../match.service';

@Component({
  selector: 'ba-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() odd_type: string;
  @Input() id: number;
  @Input() key: string;

  odds: H2HModel[] | TotalsModel[] | SpreadsModel[];
  home_team: string;
  away_team: string;

  constructor(
    private matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.fetchOdds();
  }

  fetchOdds(): void {
    let formatedOddType;
    if (this.odd_type == 'h2h') {
      formatedOddType = 'h2hs'
    } else {
      formatedOddType = this.odd_type;
    }
    this.matchService.getOdds(this.key, this.id, this.odd_type).subscribe((result: MatchModel) => {
      this.home_team = result.home_team;
      this.away_team = result.away_team;
      this.odds = result[formatedOddType];
    });
  }

}
