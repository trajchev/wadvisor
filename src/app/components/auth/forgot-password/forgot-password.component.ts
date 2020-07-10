import { Component, OnInit } from '@angular/core';
import { ForgotPasswordResponse } from '../../../models/password.reset.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'ba-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  resetTokenSent: boolean = false;
  isLoading: boolean = false;

  // create the form using reactive forms
  forgotPasswordForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onForgotPassword() {
    this.isLoading = true;
    const email = this.forgotPasswordForm.value.email;
    this.authService.forgotPassword(email).subscribe((res: ForgotPasswordResponse) => {
      if (res.status === 'success') {
        this.resetTokenSent = true;
        this.isLoading = false;
      }
    });
  }

}
