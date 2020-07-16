import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { AccountComponent } from './account/account.component';
import { ConfirmUserComponent } from './confirm-user/confirm-user.component';
import { UserComponent } from './user.component';



@NgModule({
  declarations: [
    UserComponent,
    AccountComponent,
    ConfirmUserComponent],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
