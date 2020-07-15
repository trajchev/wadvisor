import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../../material.module';
import { SharedModule } from '../shared/shared.module';
import { MatchRoutingModule } from './matches-routing.module';
import { MatchesComponent } from './matches.component';
import { MatchComponent } from './match/match.component';
import { MatchDetailsComponent } from './match-details/match-details.component';
import { H2hChartComponent } from './charts/h2h-chart/h2h-chart.component';
import { SpreadsChartComponent } from './charts/spreads-chart/spreads-chart.component';
import { TotalsChartComponent } from './charts/totals-chart/totals-chart.component';
import { reducer } from '../tickets/state/ticket.reducer';
import { TicketEffects } from '../tickets/state/ticket.effects';

@NgModule({
  declarations: [
    MatchesComponent,
    MatchComponent,
    MatchDetailsComponent,
    SpreadsChartComponent,
    TotalsChartComponent,
    H2hChartComponent
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
