import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { SpreadsModel } from 'src/app/models/spreads.model';
import { map, catchError } from 'rxjs/operators';
import { MatchModel } from 'src/app/models/match.model';
import { TotalsModel } from 'src/app/models/totals.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/modal/snackbar/snackbar.component';

@Injectable({
  providedIn: "root",
})
export class MatchService {

  durationInSeconds: number = 3;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  getMatches(sportKey: string): Observable<any> {
    return this.http.get(`${environment.ENDPOINT_API}matches/${sportKey}`);
  }

  getMatch(sportKey: string, matchId: number): Observable<MatchModel> {
    return this.http.get<{status: string, data: MatchModel}>(
      `${environment.ENDPOINT_API}matches/${sportKey}/${matchId}`
    ).pipe(
      map((res: {status: string, data: MatchModel}) => res.data)
    )
  }

  saveBetMatch(ticket_id: number, match_id: number) {
    return this.http.post(`${environment.ENDPOINT_API}tickets/match`, {ticket_id, match_id}).pipe(
      map((res: {status: string, data: any}) => {
        if (res.status === 'success') {
          this.openSnackBar();
        }
      }),
    )
  }

  getOdds(sportKey: string, matchId: number, oddType: string): Observable<MatchModel> {
      return this.http.get<{status: string, data: MatchModel}>(`${environment.ENDPOINT_API}matches/${sportKey}/${matchId}/${oddType}`).pipe(
        map((res: {status: string, data: MatchModel}) => res.data)
      )
  }

  getTotals(sportKey: string, matchId: number, oddType: string): Observable<TotalsModel[]> {
    return this.http.get<{status: string, data: any}>(`${environment.ENDPOINT_API}matches/${sportKey}/${matchId}/${oddType}`).pipe(
      map((res: {status: string, data: MatchModel}) => res.data.totals)
    )
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: 'Added match to ticket'
    });
  }

}
