import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class HomeService {

  durationInSeconds: number = 3;

  constructor(
    private http: HttpClient
  ) { }

  getMatches(): Observable<any> {
    return this.http.get(`${environment.ENDPOINT_API}home`);
  }

}
