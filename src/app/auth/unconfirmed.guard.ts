import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanLoad,
  Router,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class UnconfirmedGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.isUnconfirmed(state.url);
  }

  isUnconfirmed(url: string): boolean {
    if (this.authService.getLevel() === 'unconfirmed') {
      this.authService.redirectUrl = url;
      this.router.navigate(['/me']);
      return false
    }

    return true;

  }

  canLoad(route: Route): boolean {
    return this.isUnconfirmed(route.path);
  }

}
