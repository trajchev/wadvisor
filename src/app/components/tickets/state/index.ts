import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromTickets from './ticket.reducer';

export interface State extends fromRoot.State {
    tickets: fromTickets.TicketState;
}

const getTicketFeatureState = createFeatureSelector<fromTickets.TicketState>('tickets');

export const getTickets = createSelector(
    getTicketFeatureState,
    state => state.tickets
);

export const getError = createSelector(
    getTicketFeatureState,
    state => state.error
);
