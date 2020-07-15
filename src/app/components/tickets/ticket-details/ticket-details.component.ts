import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketService } from '../ticket.service';
import { TicketModel } from 'src/app/models/ticket.model';

@Component({
  selector: 'ba-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {

  ticket: TicketModel;

  constructor(
    private ticketService: TicketService,
    public dialogRef: MatDialogRef<TicketDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ticketId: number },
    public router: Router
  ) {
    this.getTicket(this.data.ticketId);
  }

  ngOnInit() { }

  getTicket(id: number) {
    this.ticketService.getTicket(id).subscribe((res: { status: string, data: any }) => {
      this.ticket = res.data;
    });
  }

  onCloseDialog(): void {
    this.dialogRef.close();
  }

  onDelete(connectionId: number) {
    this.ticketService
      .deleteBetMatch(connectionId)
      .subscribe(res => this.ticket.betmatches = this.ticket.betmatches.filter(bet => bet.id !== connectionId))
  }

}
