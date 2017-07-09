import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';

@Injectable()
export class UserSearchService {
  private currentUser: User;

  constructor(private http: Http) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  search(term: string): Observable<User[]> {
    console.log("search service called. Search for users matching: " + term);
    console.log("API call: " + environment.apiUrl + `api/nhl/poolApp/v1/users?name=${term}`);
    return this.http
      .get(environment.apiUrl + `api/nhl/poolApp/v1/users?name=${term}`)
      .map(response => response.json().filter(item => item.username !== this.currentUser.username) as User[]);
  }

  private extractRes(res) {

  }
}