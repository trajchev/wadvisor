import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UserComponent } from './user.component';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';

const childRoutes: Routes = [
  { path: ':token', component: ConfirmUserComponent },
  { path: '', pathMatch: 'full', component: UserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
