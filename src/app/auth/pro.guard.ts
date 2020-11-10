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
export class ProGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.isPro(state.url);
  }

  isPro(url: string): boolean {
    if (this.authService.getLevel() === 'pro') {
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/me']);
    return false
  }

  canLoad(route: Route): boolean {
    return this.isPro(route.path);
  }

}
