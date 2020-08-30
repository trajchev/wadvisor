import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from '../../match.service';
import { TotalsModel } from 'src/app/models/totals.model';
import { MatchModel } from 'src/app/models/match.model';

@Component({
  selector: 'ba-totals-chart',
  templateUrl: './totals-chart.component.html',
  styleUrls: ['./totals-chart.component.scss']
})
export class TotalsChartComponent implements OnInit {

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
      console.log(totals);
    });
  }

}
