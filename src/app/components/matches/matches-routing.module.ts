import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MatchesComponent } from "./matches.component";
import { MatchDetailsComponent } from "./match-details/match-details.component";

const childRoutes: Routes = [
  { path: ":league", component: MatchesComponent },
  { path: ":league/:matchId", component: MatchDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class MatchRoutingModule {}
