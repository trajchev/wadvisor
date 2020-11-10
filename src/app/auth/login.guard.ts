import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanLoad,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLoggedIn(state.url);
  }

  checkLoggedIn(url: string): boolean {
    if (!this.authService.getIsAuth()) {
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/me']);
    return false
  }

  canLoad(route: Route): boolean {
    return this.checkLoggedIn(route.path);
  }

}
