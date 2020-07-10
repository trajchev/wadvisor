import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable  } from "rxjs";
import { environment } from "src/environments/environment";
import { catchError, map } from 'rxjs/operators';
import { PageModel } from 'src/app/models/page.model';
import { ErrorHandlerService } from '../../errorhandler.service';

@Injectable({
  providedIn: "root",
})
export class PageService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService

  ) { }

  getPage(slug: string): Observable<PageModel> {
    return this.http.get<{status: string, data: PageModel}>(`${environment.ENDPOINT_API}pages/${slug}`)
        .pipe(
            map((res: {status: string, data: PageModel}) => res.data),
            catchError(this.errorHandlerService.handleError)
        )
  }

}
