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
        routerEvent.url === '/'
        || /^\/auth/.test(routerEvent.url)
      ) {
        this.isAuthenticated = false
      } else {
        this.isAuthenticated = true;
      }
    }
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
