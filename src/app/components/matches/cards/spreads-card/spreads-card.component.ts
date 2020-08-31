import { Component, OnInit, Input } from '@angular/core';
import { MatchService } from '../../match.service';
import { SpreadsModel } from '../../../../models/spreads.model';

@Component({
  selector: 'ba-spreads-card',
  templateUrl: './spreads-card.component.html',
  styleUrls: ['./spreads-card.component.scss']
})
export class SpreadsCardComponent implements OnInit {

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
    });
  }

}
