import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatchService } from '../match.service';
import { TicketCreateComponent } from '../../shared/modal/ticket-create/ticket-create.component';

@Component({
  selector: 'ba-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() match;
  @Input() tickets;
  @Input() userRole: string;

  avg_home;
  avg_draw;
  avg_away;

  durationInSeconds: number = 2;

  constructor(
    private matchService: MatchService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAvg()
  }

  getAvg() {
    let odds_home_sum = 0;
    let odds_draw_sum = 0;
    let odds_away_sum = 0;
    this.match.h2hs.forEach(h2h => {
      odds_home_sum = odds_home_sum + h2h.odds_home;
      odds_draw_sum = odds_draw_sum + h2h.odds_draw;
      odds_away_sum = odds_away_sum + h2h.odds_away;
    });

    this.avg_home = odds_home_sum / this.match.h2hs.length;
    this.avg_draw = odds_draw_sum / this.match.h2hs.length;
    this.avg_away = odds_away_sum / this.match.h2hs.length;
  }

  onSaveBetMatch(ticketId: number, matchId: number) {
    this.matchService.saveBetMatch(ticketId, matchId).subscribe();
  }

  onCreateTicket() {
    const createTicketRef = this.dialog.open(TicketCreateComponent, {
      width: '600px'
    });
  }

}
