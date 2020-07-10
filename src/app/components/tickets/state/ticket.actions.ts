import { Action } from '@ngrx/store';
import { TicketModel, TicketModelCreate } from 'src/app/models/ticket.model';

export enum TicketActionTypes {
    Load = '[Ticket] Load',
    LoadSuccess = '[Ticket] Load Success',
    LoadFail = '[Ticket] Load Fail',
    CreateTicket = '[Ticket], create',
    CreateTicketSuccess = '[Ticket], create success',
    CreateTicketFail = '[Ticket] create fail',
    DeleteTicket = '[Ticket] delete',
    DeleteTicketSuccess = '[Ticket] delete success',
    DeleteTicketFail = '[Ticket] delete fail',
}

export class Load implements Action {
    readonly type = TicketActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = TicketActionTypes.LoadSuccess;

    constructor (public payload: TicketModel[]) {}
}

export class LoadFail implements Action {
    readonly type = TicketActionTypes.LoadFail;

    constructor (public payload: string) {}
}

export class CreateTicket implements Action {
    readonly type = TicketActionTypes.CreateTicket;

    constructor (public payload: TicketModelCreate) {}
}

export class CreateTicketSuccess implements Action {
    readonly type = TicketActionTypes.CreateTicketSuccess;

    constructor (public payload: TicketModel) {}
}

export class CreateTicketFail implements Action {
    readonly type = TicketActionTypes.CreateTicketFail;

    constructor (public payload: string) {}
}

export class DeleteTicket implements Action {
    readonly type = TicketActionTypes.DeleteTicket;

    constructor (public payload: number) {}
}

export class DeleteTicketSuccess implements Action {
    readonly type = TicketActionTypes.DeleteTicketSuccess;

    constructor (public payload: number) {}
}

export class DeleteTicketFail implements Action {
    readonly type = TicketActionTypes.DeleteTicketFail;

    constructor (public payload: string) {}
}

export type TicketActions = Load | LoadSuccess | LoadFail
    | CreateTicket | CreateTicketSuccess | CreateTicketFail
    | DeleteTicket | DeleteTicketSuccess | DeleteTicketFail;
