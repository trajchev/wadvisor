import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';
import { MatchRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { MatchComponent } from './match/match.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { H2hCardComponent } from './cards/h2h-card/h2h-card.component';
import { SpreadsCardComponent } from './cards/spreads-card/spreads-card.component';
import { TotalsCardComponent } from './cards/totals-card/totals-card.component';
import { reducer } from '../tickets/state/ticket.reducer';
import { TicketEffects } from '../tickets/state/ticket.effects';

@NgModule({
  declarations: [
    MatchesComponent,
    MatchComponent,
    MatchDetailsComponent,
    SpreadsCardComponent,
    TotalsCardComponent,
    H2hCardComponent
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
