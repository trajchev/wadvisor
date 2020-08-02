import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth/auth.service';
import { PageComponent } from '../../shared/modal/page/page.component';

@Component({
  selector: 'ba-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  hide: boolean = true;
  hideConfirm: boolean = true;
  isLoading: boolean = false;
  isChecked: boolean = false;
  signupForm: FormGroup;
  authCredentialsOK: boolean = true;

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    iconRegistry.addSvgIcon('visibility', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/visibility.svg'));
  }

  ngOnInit(): void {
    this.isLoading = false;
    this.signupForm = new FormGroup ({
      'userName': new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'passwordConfirm': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onRegister() {
    this.isLoading = true;

    if ( this.signupForm.invalid ) { return; }

    const userName = this.signupForm.value.userName;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const passwordConfirm = this.signupForm.value.passwordConfirm;
    const recruiter = this.route.snapshot.paramMap.get('recruiter');

    this.authService.signup(userName, email, password, passwordConfirm, recruiter);
    this.authCredentialsOK = this.authService.authCredentialsOK;

    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
  }

  onLoadInfo(slug: string): void {
    const pageRef = this.dialog.open(PageComponent, {
      width: '94%',
      maxWidth: '680px',
      data: { slug: slug }
    });
  }

}
