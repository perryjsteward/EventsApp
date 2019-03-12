import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

// import { User } from '../../shared/_models/user.model';

@Injectable()
export class EventService {

    apiDomain = "https://api.eventsapp.co.uk/v1/";

    constructor(private http: HttpClient) { }

    getAll() {
        this.http.get<any[]>(this.apiDomain +'events')
            .subscribe(response => {
              console.log(response);
            });
    }

    getById(id: string) {
        return this.http.get(this.apiDomain + 'events/' + id)
                  .map((response: Response) => response)
                  .catch((error: Response) => this.handleError(error));
    }

    create(event: any): Observable<any> {
         return this.http.post(this.apiDomain + 'events', event)
                  .map((response: Response) => response)
                  .catch((error: Response) => this.handleError(error));
    }

    update(event: any) {
        return this.http.put(this.apiDomain + 'events/' + event.event_id, event)
                  .map((response: Response) => response)
                  .catch((error: Response) => this.handleError(error));
    }
    //
    // delete(id: number) {
    //     return this.http.delete('/events/' + id);
    // }
    private handleError(error: any) {
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      return Observable.throw(errMsg);
    }
}
