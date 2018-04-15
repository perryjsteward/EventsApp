import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs } from '@angular/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(){

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // req = req.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${}`
    //   }
    // });

    return next.handle(req);
  }
}
