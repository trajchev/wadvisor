import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './auth/login.guard';
import { ProGuard } from './auth/pro.guard';
import { UnconfirmedGuard } from './auth/unconfirmed.guard';
import { AdminGuard } from './auth/admin.guard';


const routes: Routes = [
  { path: 'home', loadChildren: () => import('./components/home/home.module').then(mod => mod.HomeModule), canActivate: [LoginGuard]},
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(mod => mod.AuthModule), canActivate: [LoginGuard]},
  { path: 'me', loadChildren: () => import('./components/user/user.module').then(mod => mod.UserModule), canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(mod => mod.AdminModule), canActivate: [AuthGuard, AdminGuard] },
  { path: 'matches', loadChildren: () => import('./components/matches/matches.module').then(mod => mod.MatchesModule), canActivate: [AuthGuard, UnconfirmedGuard] },
  { path: 'tickets', loadChildren: () => import('./components/tickets/tickets.module').then(mod => mod.TicketsModule), canActivate: [AuthGuard, UnconfirmedGuard, ProGuard] },
  { path: '**', loadChildren: () => import('./components/home/home.module').then(mod => mod.HomeModule), canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  providers: [AuthGuard, LoginGuard, ProGuard, UnconfirmedGuard, AdminGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
