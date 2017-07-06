import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../models/user';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('v1/users').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('v1/users/' + _id).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('v1/users/register', user);
    }

    update(user: User) {
        return this.http.put('v1/users/' + user._id, user);
    }

    delete(_id: string) {
        return this.http.delete('v1/users/' + _id);
    }
}
