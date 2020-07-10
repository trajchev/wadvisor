import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Store } from '@ngrx/store';
import * as fromTicket from '../../../tickets/state';
import * as ticketActions from '../../../tickets/state/ticket.actions';

@Component({
  selector: 'ba-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.scss']
})
export class TicketCreateComponent implements OnInit {

  createTicketForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  durationInSeconds = 3;

  constructor(
    public createTicketRef: MatDialogRef<TicketCreateComponent>,
    private _snackBar: MatSnackBar,
    private store: Store<fromTicket.State>
  ) { }

  ngOnInit() {
  }

  onCreateTicket(): void {

    this.store.dispatch(new ticketActions.CreateTicket({
      title: this.createTicketForm.value.title,
      description: this.createTicketForm.value.description
    }));

    this.openSnackBar();
    this.onCloseDialog();
  }

  onCloseDialog(): void {
    this.createTicketRef.close();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: 'Ticket created'
    });
  }

}
