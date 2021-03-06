import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: "root",
})
export class AdminService {
  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<{status: string, data: UserModel[]}>(`${environment.ENDPOINT_API}users`)
      .pipe(
        map((res: {status: string, data: UserModel[]}) => res.data)
      )
  }

  sendEmail(subject: string, users: UserModel[]): Observable<{status: string, msg: string}> {
    return this.http.post(`${environment.ENDPOINT_API}users/email-users`, {subject, users})
    .pipe(
      map((res: {status: string, msg: string}) => res)
    )
  }

}
