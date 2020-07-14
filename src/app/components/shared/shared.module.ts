import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { HeaderComponent } from './header/header.component';
import { NavMainComponent } from './nav-main/nav-main.component';
import { CheckoutComponent } from './modal/checkout/checkout.component';
import { ConfirmationComponent } from './modal/confirmation/confirmation.component';
import { PageComponent } from './modal/page/page.component';
import { SnackbarComponent } from './modal/snackbar/snackbar.component';
import { TicketCreateComponent } from './modal/ticket-create/ticket-create.component';
import { MsToDatePipe } from '../../pipes/msToDate.pipe';
import { StrToDatePipe } from '../../pipes/strToDate.pipe';
import { PaymentService } from './payment.service';
import { DataCacheInterceptor } from './data-cache.interceptor';

@NgModule({
  declarations: [
    MsToDatePipe,
    StrToDatePipe,
    HeaderComponent,
    NavMainComponent,
    CheckoutComponent,
    ConfirmationComponent,
    PageComponent,
    SnackbarComponent,
    TicketCreateComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    MaterialModule,
    HttpClientModule,
    MsToDatePipe,
    StrToDatePipe,
    NavMainComponent,
    ConfirmationComponent,
    SnackbarComponent,
    TicketCreateComponent,
  ],
  providers: [
    PaymentService,
    { provide: HTTP_INTERCEPTORS, useClass: DataCacheInterceptor, multi: true}
  ],
  entryComponents: [SnackbarComponent, ConfirmationComponent, TicketCreateComponent, PageComponent, CheckoutComponent]
})
export class SharedModule { }
