import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TicketsComponent } from './tickets.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { SharedModule } from '../shared/shared.module';
import { TicketRoutingModule } from './tickets-routing.module';
import { reducer } from './state/ticket.reducer';
import { TicketEffects } from './state/ticket.effects';
import { BetmatchComponent } from './betmatch/betmatch.component';

@NgModule({
  declarations: [
    TicketsComponent,
    TicketComponent,
    TicketDetailsComponent,
    BetmatchComponent
  ],
  imports: [
    SharedModule,
    TicketRoutingModule,
    StoreModule.forFeature('tickets', reducer),
    EffectsModule.forFeature([TicketEffects])
  ]
})
export class TicketsModule { }
