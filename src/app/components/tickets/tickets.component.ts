import { Component, OnInit } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromTicket from './state';
import * as ticketActions from './state/ticket.actions';
import { TicketModel } from '../../models/ticket.model';

@Component({
  selector: "ba-tickets",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.scss"],
})
export class TicketsComponent implements OnInit {
  pageTitle: string = 'Tickets';
  noTickets: boolean = false;

  componentActive: boolean = true;

  tickets$: Observable<TicketModel[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromTicket.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new ticketActions.Load());
    this.tickets$ = this.store.pipe(select(fromTicket.getTickets));
    this.errorMessage$ = this.store.pipe(select(fromTicket.getError))
  }
}
