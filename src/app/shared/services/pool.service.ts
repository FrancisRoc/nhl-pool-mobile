import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Subject } from 'rxjs/Subject';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';
import { Pool } from '../models/pool';
import { PoolResponse } from '../models/poolResponse';

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
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create(pool: Pool): Observable<PoolResponse> {
    console.log("Create pool called: " + environment.apiUrl + 'api/nhl/poolApp/v1/pools/create');
    return this.http.post(environment.apiUrl + 'api/nhl/poolApp/v1/pools/create', pool)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  setCurrentPool(pool: PoolResponse) {
    this.currentPool = pool;
  }

  getCurrentPool(): PoolResponse {
    return this.currentPool;
  }

  addMember(member: User) {
    //TODO Send add member to mongodb
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
