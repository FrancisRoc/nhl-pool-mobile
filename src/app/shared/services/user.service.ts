import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    //TODO change to add domain path and version for const in http trequests
    getAll() {
        return this.http.get(environment.apiUrl + 'api/nhl/poolApp/v1/users').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get(environment.apiUrl + 'api/nhl/poolApp/v1/users/' + _id).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(environment.apiUrl + 'api/nhl/poolApp/v1/users/register', user);
    }

    update(user: User) {
        return this.http.put(environment.apiUrl + 'api/nhl/poolApp/v1/users/' + user._id, user);
    }

    delete(_id: string) {
        return this.http.delete(environment.apiUrl + 'api/nhl/poolApp/v1/users/' + _id);
    }
}
