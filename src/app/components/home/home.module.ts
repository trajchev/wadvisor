import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { SplashButtonComponent } from '../inputs/splash-button/splash-button.component';
import { MaterialModule } from '../../material.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    SplashButtonComponent
  ],
  imports: [
    SharedModule, MaterialModule, HomeRoutingModule
  ]
})
export class HomeModule { }
