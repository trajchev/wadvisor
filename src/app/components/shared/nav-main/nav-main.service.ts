import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { MenuNode } from 'src/app/models/menuNode';

@Injectable({
  providedIn: 'root'
})
export class NavMainService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getNavData(): Observable<MenuNode[]> {
    return this.httpClient.get<{status: string, data: MenuNode[]}>(`${environment.ENDPOINT_API}leagues`)
      .pipe(
        map((res: {status: string, data: MenuNode[]}) => res.data)
      )
  }
}
