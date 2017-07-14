import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { Pool } from '../models/pool';
import { PoolResponse } from '../models/poolResponse';

let util = require('util');

@Injectable()
export class PoolService {
  private addMemberSubject: Subject<PoolResponse>;
  private currentPool: PoolResponse;

  constructor(private http: Http) {
    this.addMemberSubject = new Subject<PoolResponse>();
  }

  getAddMemberEvent(): Observable<PoolResponse> {
    return this.addMemberSubject.asObservable();
  }

  //TODO change to add domain path and version for const in http trequests
  getAllForMember(memberId: string) {
    return this.http.get(environment.apiUrl + 'api/nhl/poolApp/v1/pools/getAll/' + memberId).map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  create(pool: Pool): Observable<PoolResponse> {
    console.log("Create pool called: " + environment.apiUrl + 'api/nhl/poolApp/v1/pools/create');
    return this.http.post(environment.apiUrl + 'api/nhl/poolApp/v1/pools/create', pool)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  setCurrentPool(pool: PoolResponse) {
    this.currentPool = pool;
  }

  getCurrentPool(): PoolResponse {
    return this.currentPool;
  }

  addMember(member: User) {
    //Server get an array of users
    let members: User[] = [];
    members.push(member);

    //Send add member to mongodb
    console.log("Add member: " + environment.apiUrl + 'api/nhl/poolApp/v1/pools/' + this.currentPool._id + '/members');
    console.log("With members: " + util.inspect(members, false, null))
    this.http.post(environment.apiUrl + 'api/nhl/poolApp/v1/pools/' + this.currentPool._id + '/members', members)
      .catch((error: any) => Observable.throw(error || 'Server error'))
      .subscribe();

    this.currentPool.members.push(member);
    this.addMemberSubject.next(this.currentPool);
  }

  /*update(user: User) {
      return this.http.put(environment.apiUrl + 'api/nhl/poolApp/v1/users/' + user._id, user);
  }

  delete(_id: string) {
      return this.http.delete(environment.apiUrl + 'api/nhl/poolApp/v1/users/' + _id);
  }*/
}
