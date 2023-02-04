import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

Injectable();
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log(req);
    //TODO! cosing error - withCredentials is reade only!!!
    // req.withCredentials = true;
    //! insted - Modify the outgoing request
    const modifiedReq = req.clone({
      withCredentials: true,
    });
    return next.handle(modifiedReq).pipe(
      tap((val) => {
        // console.log(val);
        if (val.type === HttpEventType.Sent) {
          console.log('Request was send to server');
        }
        if (val.type === HttpEventType.Response) {
          console.log('Got a response from the API', val);
        }
      })
    );
  }
}
