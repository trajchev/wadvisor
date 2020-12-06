import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';
import { MatchRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { MatchComponent } from './match/match.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { CardComponent } from './card/card.component';
import { reducer } from '../tickets/state/ticket.reducer';
import { TicketEffects } from '../tickets/state/ticket.effects';

@NgModule({
  declarations: [
    MatchesComponent,
    MatchComponent,
    MatchDetailsComponent,
    CardComponent
  ],
  imports: [
    MatchRoutingModule,
    SharedModule,
    MaterialModule,
    StoreModule.forFeature('tickets', reducer),
    EffectsModule.forFeature([TicketEffects])
  ]
})
export class MatchesModule { }
