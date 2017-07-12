import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { environment } from '../../../environments/environment';
import { Pool } from '../models/pool';
import { PoolResponse } from '../models/poolResponse';

@Injectable()
export class PoolService {
  constructor(private http: Http) { }

  //TODO change to add domain path and version for const in http trequests
  getAll() {
    return this.http.get(environment.apiUrl + 'api/nhl/poolApp/v1/pools/getAll').map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create(pool: Pool): Observable<PoolResponse> {
    console.log("Create pool called: " + environment.apiUrl + 'api/nhl/poolApp/v1/pools/create');
    return this.http.post(environment.apiUrl + 'api/nhl/poolApp/v1/pools/create', pool)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /*update(user: User) {
      return this.http.put(environment.apiUrl + 'api/nhl/poolApp/v1/users/' + user._id, user);
  }

  delete(_id: string) {
      return this.http.delete(environment.apiUrl + 'api/nhl/poolApp/v1/users/' + _id);
  }*/
}
