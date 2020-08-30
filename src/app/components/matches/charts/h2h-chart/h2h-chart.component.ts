import { Component, OnInit, Input } from '@angular/core';

import { H2HModel } from '../../../../models/h2h.model';
import { MatchModel } from 'src/app/models/match.model';

@Component({
  selector: 'ba-h2h-chart',
  templateUrl: './h2h-chart.component.html',
  styleUrls: ['./h2h-chart.component.scss']
})
export class H2hChartComponent implements OnInit {

  @Input() h2hs: H2HModel[];
  @Input() match: MatchModel;

  constructor() {}

  ngOnInit(): void { }

}
