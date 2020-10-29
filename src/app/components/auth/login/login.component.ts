import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ba-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterContentChecked {

  isLoading: boolean = false;
  authCredentialsOK: boolean = true;
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  onLogin() {
    // get login credentials from login form
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.isLoading = true;
    this.authService.login(email, password);
    this.authCredentialsOK = this.authService.authCredentialsOK;

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

  }
}
