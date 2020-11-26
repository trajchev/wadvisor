import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from '../../material.module';
import { HeaderComponent } from './header/header.component';
import { SplashButtonComponent } from './splash-button/splash-button.component';
import { NavMainComponent } from './nav-main/nav-main.component';
import { ConfirmationComponent } from './modal/confirmation/confirmation.component';
import { PageComponent } from './modal/page/page.component';
import { SnackbarComponent } from './modal/snackbar/snackbar.component';
import { TicketCreateComponent } from './modal/ticket-create/ticket-create.component';
import { MsToDatePipe } from '../../pipes/msToDate.pipe';
import { StrToDatePipe } from '../../pipes/strToDate.pipe';
import { KeepHTMLPipe } from '../../pipes/keepHTML.pipe';
import { DataCacheInterceptor } from './data-cache.interceptor';
import { InputComponent } from './input/input.component';
import { HorizontalScrollDirective } from '../../directives/horizontal-scroll.directive';

@NgModule({
  declarations: [
    MsToDatePipe,
    StrToDatePipe,
    KeepHTMLPipe,
    HeaderComponent,
    NavMainComponent,
    ConfirmationComponent,
    PageComponent,
    SnackbarComponent,
    TicketCreateComponent,
    SplashButtonComponent,
    InputComponent,
    HorizontalScrollDirective
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
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
    KeepHTMLPipe,
    NavMainComponent,
    ConfirmationComponent,
    SnackbarComponent,
    TicketCreateComponent,
    SplashButtonComponent,
    InputComponent,
    HorizontalScrollDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: DataCacheInterceptor, multi: true}
  ],
  entryComponents: [SnackbarComponent, ConfirmationComponent, TicketCreateComponent, PageComponent]
})
export class SharedModule { }
