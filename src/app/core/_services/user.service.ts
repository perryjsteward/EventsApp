import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../shared/_models/user.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>('/users');
    }

    getById(id: number) {
        return this.http.get('/users/' + id);
    }

    create(user: any) {
        return this.http.post('/users', user);
    }

    update(user: any) {
        return this.http.put('/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/users/' + id);
    }
}
