import { Component, OnInit, Input } from '@angular/core';

import { H2HModel } from '../../../../models/h2h.model';
import { MatchModel } from '../../../../models/match.model';

@Component({
  selector: 'ba-h2h-card',
  templateUrl: './h2h-card.component.html',
  styleUrls: ['./h2h-card.component.scss']
})
export class H2hCardComponent implements OnInit {

  @Input() h2hs: H2HModel[];
  @Input() match: MatchModel;

  constructor() {}

  ngOnInit(): void { }

}
