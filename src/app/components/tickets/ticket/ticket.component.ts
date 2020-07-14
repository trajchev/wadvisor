import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { ConfirmationComponent } from '../../shared/modal/confirmation/confirmation.component';

@Component({
  selector: 'ba-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  @Input() ticket;

  ticketId: number;
  message: string;

  constructor(
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(TicketDetailsComponent, {
      width: '90%',
      maxWidth: '500px',
      data: { ticketId: this.ticket.id }
    });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '260px',
      data: {
        ticketId: this.ticket.id,
        title: 'Delete ticket?',
        message: 'Are you sure you want to delete this ticket?'
      }
    });
  }
}
