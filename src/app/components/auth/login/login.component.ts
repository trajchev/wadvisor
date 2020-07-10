import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ba-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  hide: boolean = true
  private authStatusSub: Subscription;
  authCredentialsOK: boolean = true;
  loginForm: FormGroup;

  constructor(
    public iconRegistry: MatIconRegistry,
    public sanitizer: DomSanitizer,
    private authService: AuthService
  ) {
    iconRegistry.addSvgIcon('visibility', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility.svg'));
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = authStatus;
    });
  }

  onLogin() {
    // get login credentials from login form
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Stop execution of form is invalid
    if ( this.loginForm.invalid ) { return; }

    this.isLoading = true;
    this.authService.login(email, password);
    this.authCredentialsOK = this.authService.authCredentialsOK;
    this.loginForm.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
