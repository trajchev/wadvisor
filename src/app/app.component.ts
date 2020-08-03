import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Win Advisor';

  isAuthenticated: boolean = false;
  loading: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
   ) {
     router.events.subscribe((routerEvent: Event) => {
       this.checkRouterEvent(routerEvent);
     });
  }

  checkRouterEvent(routerEvent: Event): void {
    // If we are on home page or auth page user is not authenticated
    if (routerEvent instanceof NavigationEnd) {
      if (
        /^\/me/.test(routerEvent.url)
        || /^\/me/.test(routerEvent.url)
        || /^\/admin/.test(routerEvent.url)
        || /^\/matches/.test(routerEvent.url)
        || /^\/tickets/.test(routerEvent.url)
      ) {
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false;
      }
    }
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
