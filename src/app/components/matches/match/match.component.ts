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

  durationInSeconds: number = 2;

  constructor(
    private matchService: MatchService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void { }

  onSaveBetMatch(ticketId: number, matchId: number) {
    this.matchService.saveBetMatch(ticketId, matchId).subscribe();
  }

  onCreateTicket() {
    const createTicketRef = this.dialog.open(TicketCreateComponent, {
      width: '600px'
    });
  }

}
