import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { CreatePageComponent } from './page/create-page/create-page.component';

const childRoutes: Routes = [
    {path: '', component: AdminDashboardComponent},
    {path: 'users', component: UsersComponent},
    {path: 'page', component: CreatePageComponent, children: [
      {path: 'create', component: CreatePageComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
