import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthModel } from '../models/auth.model';
import { ErrorHandlerService } from '../components/shared/errorhandler.service';

const BACKEND_URL = environment.ENDPOINT_API;

interface AuthResponseData {
  status: string;
  token: string;
  expiresIn: number;
  level: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;
  private token: string;
  private tokenTimer: any;
  // timer for the token refresh functionality
  private refreshTokenTimer: any;
  authCredentialsOK: boolean;
  redirectUrl: string;
  private authStatusListener = new Subject<boolean>();
  private message: string = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlrer: ErrorHandlerService
  ) { }

  // Retrieve token
  getToken(): string {
    return this.token;
  }

  // Retrieve user level
  getLevel(): string {
    return this.getUserLevel();
  }

  getMessage():string {
    return this.message;
  }

  // Retrieve user auth status
  getIsAuth(): boolean {
    return !!this.isAuthenticated;
  }

  // Emit user login/logout
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // signup
  signup(username: string, email: string, password: string, passwordConfirm: string, recruiter?: string) {
    if ( password !== passwordConfirm ) { return; }
    const authData = { username, email, password, passwordConfirm };
    return this.http.post<AuthResponseData>(`${BACKEND_URL}users/signup/${recruiter}`, authData).subscribe(
      (response: AuthResponseData) => {
        this.tokenHandler(response)
        if (response.status === 'success') {
          this.router.navigate(['/me']);
        } else {
          this.message = response.message;
        }
      },
      // error => this.authStatusListener.next(false)
      error => this.errorHandlrer.handleError(error)
    );
  }

  login(email: string, password: string) {
    const authData: AuthModel = { email, password };
    this.http.post<AuthResponseData>(`${BACKEND_URL}users/login`, authData)
    .subscribe((response: AuthResponseData) => {
      this.tokenHandler(response);
    }, error => {
      this.authCredentialsOK = false;
      this.authStatusListener.next(false);
    })
  }

  forgotPassword(email: string) {
    return this.http.post(`${BACKEND_URL}users/forgotPassword`, { email });
  }

  resetPassword(token: string, password: string, passwordConfirm: string) {
    return this.http.patch(`${BACKEND_URL}users/resetPassword/${token}`, { password, passwordConfirm });
  }

  confirmUser(confirmationToken: string) {
    return this.http.get(`${BACKEND_URL}users/confirm-user/${confirmationToken}`)
      .subscribe((res: any) => {
        if (res.status == 'success') {
          this.confirmUserLevel(res.level)
        }
      })
  }

  // Clear auth data when expiration time runs out (1 hour)
  autoAuthUser() {
    const authInfo = this.getAuthData();
    if ( !authInfo ) { return; }
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if ( expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.setRefreshTokenTimer(expiresIn);
      this.authStatusListener.next(true);
    }
  }

  // Log user out
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  refreshToken() {
    this.http.get<AuthResponseData>(`${BACKEND_URL}users/refresh-token`)
    .subscribe((response: AuthResponseData) => {
      this.tokenHandler(response);
    }, error => {
      this.authCredentialsOK = false;
      this.authStatusListener.next(false);
    })
  }

  // Set auth refresh token
  private setRefreshTokenTimer(duration: number) {
    this.refreshTokenTimer = setTimeout(() => {
      this.refreshToken();
    }, duration - 60000);
  }

  private saveAuthData(token: string, expirationDate: Date, level: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('level', level);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('level');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) { return; }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }

  private getUserLevel(): string {
    return localStorage.getItem('level');
  }

  private confirmUserLevel(level: string): void {
    localStorage.setItem('level', level);
  }

  private tokenHandler(data: AuthResponseData) {
    if (data.status === 'success') {
      const token = data.token;
      const level = data.level;
      this.token = token;

      if (token) {
        const expiresInDuration = data.expiresIn;
        this.setRefreshTokenTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        // Set expiration date/time
        const expirationDate = new Date(now.getTime() + expiresInDuration);
        this.saveAuthData(token, expirationDate, level);
        // Once logged in, navigate to dashboard
        if (this.redirectUrl) {
          this.router.navigateByUrl(this.redirectUrl);
        } else {
          this.router.navigate(['/me']);
        }
      }
    }

  }
}
