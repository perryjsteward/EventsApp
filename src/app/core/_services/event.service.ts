import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//
// import { User } from '../../shared/_models/user.model';

@Injectable()
export class EventService {

    apiDomain = "https://api.eventsapp.co.uk/";

    constructor(private http: HttpClient) { }

    // getAll() {
    //     return this.http.get<any[]>('/events');
    // }

    getById(id: number) {
        return this.http.get('/events/' + id);
    }

    create(event: any) {
        return this.http.post('/event', event);
    }

    // update(event: any) {
    //     return this.http.put('/events/' + event.id, event);
    // }
    //
    // delete(id: number) {
    //     return this.http.delete('/events/' + id);
    // }
}
