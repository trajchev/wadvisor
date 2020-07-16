import { TicketModel } from 'src/app/models/ticket.model';
import { TicketActions, TicketActionTypes } from './ticket.actions';
import { BetMatch } from 'src/app/models/betmatch.model';

export interface TicketState {
    tickets: TicketModel[];
    betmatches?: BetMatch[]
    error: string;
}

const initialState: TicketState = {
    tickets: [],
    betmatches: [],
    error: ''
}

export function reducer(state = initialState, action: TicketActions): TicketState {

    switch ( action.type ) {

        case TicketActionTypes.LoadSuccess:
            return {
                ...state,
                tickets: [...action.payload],
                error: ''

            };

        case TicketActionTypes.LoadFail:
            return {
                ...state,
                tickets: [],
                error: action.payload
            }

        case TicketActionTypes.CreateTicketSuccess:
            return {
                ...state,
                tickets: [...state.tickets, action.payload],
                error: ''
            }

        case TicketActionTypes.CreateTicketFail:
            return {
                ...state,
                error: action.payload
            }

        case TicketActionTypes.DeleteTicketSuccess:
            return {
                ...state,
                tickets: state.tickets.filter(ticket => ticket.id !== action.payload),
                error: ''
            }

        default:
            return state;
    }

}
