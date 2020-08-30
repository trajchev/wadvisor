import { Component, OnInit, Input } from '@angular/core';

import { MatchService } from '../../match.service';
import { MatchModel } from 'src/app/models/match.model';
import { SpreadsModel } from 'src/app/models/spreads.model';

@Component({
  selector: 'ba-spreads-chart',
  templateUrl: './spreads-chart.component.html',
  styleUrls: ['./spreads-chart.component.scss']
})
export class SpreadsChartComponent implements OnInit {

  @Input() id: number;
  @Input() key: string;
  @Input() home_team: string;
  @Input() away_team: string;

  spreads: SpreadsModel[];

  constructor(
    private matchService: MatchService
  ) { }

  ngOnInit(): void {
    this.fetchSpreads();
  }

  fetchSpreads(): void {
    this.matchService.getSpreads(this.key, this.id, 'spreads').subscribe(spreads => {
      this.spreads = spreads;
      console.log('Spreads ', spreads);
    });
  }

}
