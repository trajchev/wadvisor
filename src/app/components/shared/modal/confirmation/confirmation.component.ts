import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as fromTickets from '../../../tickets/state';
import * as ticketActions from '../../../tickets/state/ticket.actions';

export interface DialogData {
  ticketId?: number;
  title: string;
  message: string;
}

@Component({
  selector: 'ba-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  message: string = null;
  isLoading: boolean = false;

  constructor(
    public confirmationRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private store: Store<fromTickets.State>
  ) { }

  ngOnInit(): void { }

  deleteTicket(): void {
    this.store.dispatch(new ticketActions.DeleteTicket(this.data.ticketId));
    this.confirmationRef.close();
  }

  onCloseDialog(): void {
    this.confirmationRef.close();
  }

}
