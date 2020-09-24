import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { CreatePageComponent } from './page/create-page/create-page.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    UsersComponent,
    CreatePageComponent
  ],
  imports: [
    SharedModule,
    AngularEditorModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
