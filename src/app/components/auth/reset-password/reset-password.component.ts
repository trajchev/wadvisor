import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  hide: boolean = true;
  hideConfirm: boolean = true;
  passMatch: boolean = true;
  passReset: boolean = false;
  isLoading: boolean = false;

  // create the form using reactive forms
  resetPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('visibility', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility.svg'));
  }

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
