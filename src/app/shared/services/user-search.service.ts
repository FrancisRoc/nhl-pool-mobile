import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';
import { OpponentsService } from '../services/opponentsService';
import { Opponent } from '../../add-opponent-form/opponent';
import { User } from '../models/user';

@Injectable()
export class UserSearchService {
  private currentUser: User;
  private opponents: Opponent[];

  constructor(private http: Http, private opponentService: OpponentsService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  search(term: string): Observable<User[]> {
    console.log("search service called. Search for users matching: " + term);
    console.log("API call: " + environment.apiUrl + `api/nhl/poolApp/v1/users?name=${term}`);

    // Update opponents
    this.opponents = this.opponentService.getOpponents();
    return this.http
      .get(environment.apiUrl + `api/nhl/poolApp/v1/users?name=${term}`)
      .map(response => {
        let allUsers: User[] = response.json();
        console.log(allUsers);
        let excludeCurrentUser: User[] = allUsers.filter(item => item.username !== this.currentUser.username)
        console.log(excludeCurrentUser);
        for (let i = 0; i < this.opponents.length; i++) {
          console.log("Opponent to filter: " + this.opponents[i].username);
          console.log(excludeCurrentUser);
          excludeCurrentUser = excludeCurrentUser.filter(item => item.username !== this.opponents[i].username);
        }
        return excludeCurrentUser as User[] 
      });
  }

  private extractRes(res) {

  }
}