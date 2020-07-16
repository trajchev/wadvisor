import { Injectable } from "@angular/core";

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { TicketService } from '../ticket.service';
import * as ticketActions from './ticket.actions'
import { TicketModel, TicketModelCreate } from '../../../models/ticket.model';

@Injectable()
export class TicketEffects {

    constructor(
        private actions$: Actions,
        private ticketService: TicketService
    ) {}

    @Effect()
    loadTickets$: Observable<Action> = this.actions$.pipe(
        ofType(ticketActions.TicketActionTypes.Load),
        mergeMap(action =>
            this.ticketService.getTickets().pipe(
                map(tickets => (new ticketActions.LoadSuccess(tickets))),
                catchError(err => of(new ticketActions.LoadFail(err)))
            )
        )
    );

    @Effect()
    createTicket$: Observable<Action> = this.actions$.pipe(
        ofType(ticketActions.TicketActionTypes.CreateTicket),
        map((action: ticketActions.CreateTicket) => action.payload),
        mergeMap((ticket: TicketModelCreate) =>
            this.ticketService.createTicket(ticket.title, ticket.description).pipe(
                map((res: {status: string, data: TicketModel}) => (new ticketActions.CreateTicketSuccess(res.data))),
                catchError(err => of(new ticketActions.CreateTicketFail(err)))
            )
        )
    );

    @Effect()
    deleteTicket$: Observable<Action> = this.actions$.pipe(
        ofType(ticketActions.TicketActionTypes.DeleteTicket),
        map((action: ticketActions.DeleteTicket) => action.payload),
        mergeMap((id: number) =>
            this.ticketService.deleteTicket(id).pipe(
                map(() => (new ticketActions.DeleteTicketSuccess(id))),
                catchError(err => of(new ticketActions.DeleteTicketFail(err)))
            )
        )
    )

}
