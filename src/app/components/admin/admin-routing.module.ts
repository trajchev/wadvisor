import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';

const childRoutes: Routes = [
    {path: '', component: AdminDashboardComponent},
    {path: 'users', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
