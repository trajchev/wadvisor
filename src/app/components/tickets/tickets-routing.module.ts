import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TicketsComponent } from "./tickets.component";
import { TicketDetailsComponent } from "./ticket-details/ticket-details.component";

const childRoutes: Routes = [
  { path: ":id", component: TicketDetailsComponent },
  { path: '', component: TicketsComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {}
