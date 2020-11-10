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
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.isAdmin(state.url);
  }

  isAdmin(url: string): boolean {
    if (this.authService.getLevel() === 'admin') {
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/me']);
    return false
  }

  canLoad(route: Route): boolean {
    return this.isAdmin(route.path);
  }

}
