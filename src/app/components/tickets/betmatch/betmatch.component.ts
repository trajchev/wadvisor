import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TicketModel } from 'src/app/models/ticket.model';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'ba-betmatch',
  templateUrl: './betmatch.component.html',
  styleUrls: ['./betmatch.component.scss']
})
export class BetmatchComponent implements OnInit {

  @Input() match: any;
    ticket: TicketModel;
    editMode: boolean = false;
    betmatchForm: FormGroup;
    isLoading: boolean = false;
    errorMessage: string = null;

    constructor(
        public router: Router,
        public dialogRef: MatDialogRef<TicketDetailsComponent>,
        private ticketService: TicketService
    ) { }

    ngOnInit(): void {
        this.betmatchForm = new FormGroup({
            'tip' : new FormControl(null, [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(4)
            ])
        });
    }

    navigateToMatch(sportKey: string, matchId: number) {
        this.onCloseDialog();
        this.router.navigate([`/matches/${sportKey}/${matchId}`]);
    }

    onEdit() {
      this.editMode = true;
    };

    onSave() {
        if (this.betmatchForm.invalid) { return; }
        this.isLoading = true;
        const tip = this.betmatchForm.value.tip;
        this.ticketService.updateTicket(this.match.id, tip).subscribe((res: {status: string, data: number[]}) => {
            if (res.status === 'success') {
                this.match.tip = tip;
            } else {
                this.errorMessage = 'Something went wrong, please try again later';
            }
            this.isLoading = false;
        })
        this.editMode = false;
    }

    onCloseDialog(): void {
        this.dialogRef.close();
    }

}
