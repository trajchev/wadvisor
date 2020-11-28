import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from 'src/app/auth/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from '../../user/user.service';
import { TicketCreateComponent } from '../modal/ticket-create/ticket-create.component';
import { PageComponent } from '../modal/page/page.component';
import { ConfirmationComponent } from '../modal/confirmation/confirmation.component';

@Component({
  selector: 'ba-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Input() isAuth: boolean = false;
  user: UserModel;
  pageSlug: string = null;
  userRole: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.isAuth) {
      this.getUser();
      this.userRole = this.authService.getLevel();
    }

  }

  ngOnChanges(): void {
    if (this.isAuth) {
      this.userRole = this.authService.getLevel();
      if (this.userRole === 'unconfirmed') {
        setInterval(() => {this.openConfirmationDialog()}, 20000);
      }
    }
  }

  onCreateTicket(): void {
    const createTicketRef = this.dialog.open(TicketCreateComponent, {
        width: '94%',
        maxWidth: '600px'
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  getUser(): void {
    this.userService.getUser().subscribe(user => this.user = user);
  }

  getBackgroundClass(): string {
    return this.isAuth ? 'back-user' : 'back-home';
  }

  openPage(slug: string): void {
    const pageRef = this.dialog.open(PageComponent, {
      width: '94%',
      maxWidth: '680px',
      data: { slug: slug, last_four: this.user.last_four }
    });
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '98%',
      data: {
        type: 'confirm',
        title: 'Please confirm your email address',
        message: 'Your account has not been confirmed. Please confirm it by going to the email account with which you provided when signing up. Click the button/link in the confirmation email we sent.'
      }
    });
  }

}
