import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from "src/environments/environment";
import { UserModel } from 'src/app/models/user.model';
import { ErrorHandlerService } from '../shared/errorhandler.service';

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getUser(): Observable<UserModel> {
    return this.http.get<{status: string, data: UserModel}>(`${environment.ENDPOINT_API}users/me`)
      .pipe(
        map((res: {status: string, data: UserModel}) => res.data),
        catchError(this.errorHandlerService.handleError)
      )
  }

  uploadPhoto(photo: File | string): Observable<{photo: string}> {
    const postData = new FormData();
    postData.append('photo', photo);

    return this.http.patch(`${environment.ENDPOINT_API}users/me/update`, postData)
    .pipe(
      map((res: {status: string, data: {photo: string}}) => res.data),
      catchError(this.errorHandlerService.handleError)
    )
  }

}
