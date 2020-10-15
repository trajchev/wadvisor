import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ba-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passMatch: boolean = true;
  passReset: boolean = false;
  isLoading: boolean = false;

  // create the form using reactive forms
  resetPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    this.resetPasswordForm = new FormGroup({
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'passwordConfirm': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onResetPassword() {
    this.isLoading = true;
    const password = this.resetPasswordForm.value.password;
    const passwordConfirm = this.resetPasswordForm.value.passwordConfirm;
    const token = this.route.snapshot.paramMap.get('token');
    if (password === passwordConfirm) {
      this.authService.resetPassword(token, password, passwordConfirm).subscribe((res: any) => {
        this.isLoading = false;
        if (res.status === 'success') {
          this.passReset = true;
        }
      });
    } else {
      this.passMatch = false;
      this.isLoading = false;
    }
  }

}
