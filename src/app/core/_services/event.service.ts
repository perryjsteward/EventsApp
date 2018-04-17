import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//
// import { User } from '../../shared/_models/user.model';

@Injectable()
export class EventService {

    apiDomain = "https://api.eventsapp.co.uk/";

    constructor(private http: HttpClient) { }

    getAll() {
        this.http.get<any[]>(this.apiDomain +'events')
            .subscribe(response => {
              console.log(response);
            });
    }

    getById(id: number) {
        return this.http.get(this.apiDomain + 'events/' + id);
    }

    create(event: any) {
        console.log(event)
        this.http.post(this.apiDomain + 'events', event)
            .subscribe(response => {
              console.log(response);
            });
    }

    // update(event: any) {
    //     return this.http.put('/events/' + event.id, event);
    // }
    //
    // delete(id: number) {
    //     return this.http.delete('/events/' + id);
    // }
}
