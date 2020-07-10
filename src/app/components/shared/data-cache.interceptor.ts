import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { DataCacheService } from './data-cache.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataCacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: DataCacheService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.method !== 'GET') {
            // Invalidating cache
            this.cacheService.invalidateCache();
            return next.handle(req);
        }

        const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);

        if (cachedResponse) {
            // console.log(`Returning cached response: ${cachedResponse.url}`)
            return of(cachedResponse);
        }

        return next.handle(req)
            .pipe(
                tap(event => {
                    if(event instanceof HttpResponse) {
                        // console.log(`Adding item to cache: ${req.url}`);
                        this.cacheService.put(req.url, event);
                    }
                })
            )

    }

}
