import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatchModel } from '../../models/match.model';
import { TicketModel } from '../../models/ticket.model';
import { MatchService } from './match.service';
import * as fromTicket from '../tickets/state';
import * as ticketActions from '../tickets/state/ticket.actions';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'ba-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  matches: MatchModel[];
  tickets$: Observable<TicketModel[]>;
  errorMessage$: Observable<string>;
  noMatches: boolean = false;
  userRole: string;

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
    private store: Store<fromTicket.State>,
    private authService: AuthService,
  ) {
    this.userRole = this.authService.getLevel();
  }

  ngOnInit(): void {

    this.store.dispatch(new ticketActions.Load());
    this.tickets$ = this.store.pipe(select(fromTicket.getTickets));
    this.errorMessage$ = this.store.pipe(select(fromTicket.getError));

    this.route.params.subscribe((params: Params) => {
      this.getMatches(params['league']);
    });
  }

  getMatches(league: string) {
    this.matchService.getMatches(league).subscribe(
      (res: {
        status: string,
        stats: {records: number, current: number},
        data: MatchModel[]
      }) => {
        this.noMatches = false;
        this.matches = res.data;
        if(res.data.length == 0) {
        this.noMatches = true;
        }
      })
  }

}
