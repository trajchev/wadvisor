import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule, MaterialModule, HomeRoutingModule
  ]
})
export class HomeModule { }
