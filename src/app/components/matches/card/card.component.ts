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
  @Input() home_team: string;
  @Input() away_team: string;
  @Input() odds: H2HModel[] | TotalsModel[] | SpreadsModel[];
  @Input() match: MatchModel;

  constructor(
    private matchService: MatchService
  ) {}

  ngOnInit(): void {
    if (this.odd_type !== 'h2hs') {
      this.fetchOdds();
    }
  }

  fetchOdds(): void {
    this.matchService.getSpreads(this.key, this.id, this.odd_type).subscribe(result => {
      this.odds = result;
    });
  }

}
