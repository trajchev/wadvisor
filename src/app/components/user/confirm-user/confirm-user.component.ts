import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'ba-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.scss']
})
export class ConfirmUserComponent implements OnInit {

  token: string = null;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  ngOnInit(): void {

    this.authService.confirmUser(this.token);

  }

}
