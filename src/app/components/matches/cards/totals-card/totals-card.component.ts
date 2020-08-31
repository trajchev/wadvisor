import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from '../../match.service';
import { TotalsModel } from '../../../../models/totals.model';

@Component({
  selector: 'ba-totals-card',
  templateUrl: './totals-card.component.html',
  styleUrls: ['./totals-card.component.scss']
})
export class TotalsCardComponent implements OnInit {

  @Input() id: number;
  @Input() key: string;
  @Input() home_team: string;
  @Input() away_team: string;

  totals: TotalsModel[];

  constructor(
    private matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.fetchTotals();
  }

  fetchTotals(): void {
    this.matchService.getTotals(this.key, this.id, 'totals').subscribe(totals => {
      this.totals = totals;
    });
  }

}
