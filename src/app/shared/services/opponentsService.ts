import { Injectable } from '@angular/core';
import { Opponent } from 'app/add-opponent-form/opponent';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as localStorageIndexes from 'app/shared/const/localStorageIndexes';

let util = require('util');

@Injectable()
export class OpponentsService {
    private addOpponentSubject: Subject<Opponent[]>;
    private opponents: Opponent[];

    constructor() {
      this.addOpponentSubject = new Subject<Opponent[]>();

      let recoverOpponents: Opponent[] = JSON.parse(localStorage.getItem(localStorageIndexes.SERVICE_OPPONENTS));
      if (recoverOpponents) {
        this.opponents = recoverOpponents;
      } else {
        this.opponents = [];
      }
    }

    addOpponent(opponent: Opponent) {
      console.log("OpponentsService added" + util.inspect(opponent, false, null));
      this.opponents.push(opponent);
      this.addOpponentSubject.next(this.opponents);
      localStorage.setItem(localStorageIndexes.SERVICE_OPPONENTS, JSON.stringify(this.opponents));
    }

    getAddOpponentEvent(): Observable<Opponent[]> {
      return this.addOpponentSubject.asObservable();
    }

    getOpponents() {
      return this.opponents;
    }
}
