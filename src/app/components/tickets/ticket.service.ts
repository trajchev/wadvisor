import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { TicketModel } from 'src/app/models/ticket.model';
import { ErrorHandlerService } from '../shared/errorhandler.service';

@Injectable({
  providedIn: "root",
})
export class TicketService {
  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlerService
  ) { }

  createTicket(title: string, description: string) {
    return this.http.post(`${environment.ENDPOINT_API}tickets`, {title, description});
  }

  getTicket(id: number) {
    return this.http.get(`${environment.ENDPOINT_API}tickets/${id}`)
  }

  getTickets(): Observable<TicketModel[]> {
    return this.http.get<{status: string, data: TicketModel[]}>(`${environment.ENDPOINT_API}tickets`)
      .pipe(
        map((res : {status: string, data: TicketModel[]}) => res.data),
        catchError(this.errorHandlingService.handleError)
      )
  }

  updateTicket(betmatchId: number, tip:string) {
    return this.http.patch(`${environment.ENDPOINT_API}tickets/tip/${betmatchId}`, {tip: tip});
  }

  deleteTicket(id: number) {
    return this.http.delete(`${environment.ENDPOINT_API}tickets/${id}`);
  }

  deleteBetMatch(id:number) {
    return this.http.delete(`${environment.ENDPOINT_API}tickets/match/${id}`);
  }

}
