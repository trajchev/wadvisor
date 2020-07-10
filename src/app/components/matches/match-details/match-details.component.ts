import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatchService } from '../match.service';
import { MatchModel } from '../../../models/match.model';
import { TicketModel } from '../../../models/ticket.model';
import * as fromTicket from '../../tickets/state';
import * as ticketActions from '../../tickets/state/ticket.actions';
import { AuthService } from '../../../auth/auth.service';
import { TicketCreateComponent } from '../../shared/modal/ticket-create/ticket-create.component';

@Component({
  selector: 'ba-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.scss']
})
export class MatchDetailsComponent implements OnInit {

  match: MatchModel;
  tickets$: Observable<TicketModel[]>;
  errorMessage$: Observable<string>;
  userRole: string;

  durationInSeconds: number = 3;

  constructor(
    private matchService: MatchService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private store: Store<fromTicket.State>,
    public dialog: MatDialog,
  ) {
    this.userRole = this.authService.getLevel();
  }

  ngOnInit() {
    this.store.dispatch(new ticketActions.Load());
    this.tickets$ = this.store.pipe(select(fromTicket.getTickets));
    this.errorMessage$ = this.store.pipe(select(fromTicket.getError));
    const league = this.route.snapshot.params['league'];
    const matchId = +this.route.snapshot.params['matchId'];
    this.getMatch(league, matchId);
  }

  getMatch(league: string, matchId: number) {
    this.matchService.getMatch(league, matchId).subscribe(match => this.match = match);
  }

  onSaveBetMatch(ticketId: number, matchId: number) {
    this.matchService.saveBetMatch(ticketId, matchId).subscribe()
  }

  onCreateTicket() {
    const createTicketRef = this.dialog.open(TicketCreateComponent, {
      width: '94%',
      maxWidth: '600px'
    });
  }

}
