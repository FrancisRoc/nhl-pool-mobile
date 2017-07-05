import { Injectable } from '@angular/core';
import { IUserInfos } from '../interfaces/userInfos';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as localStorageIndexes from '../../../app/shared/const/localStorageIndexes';

let util = require('util');

@Injectable()
export class UserInfosService {
    private setUserInfosSubject: Subject<IUserInfos>;
    private userInfos: IUserInfos;

    constructor() {
      this.setUserInfosSubject = new Subject<IUserInfos>();
    }

    setUserInfos(userInfos: IUserInfos) {
      console.log("UserInfosService changed user infos for " + util.inspect(userInfos, false, null));
      this.userInfos = userInfos;
      this.setUserInfosSubject.next(this.userInfos);
    }

    getUserInfosSubjectEvent(): Observable<IUserInfos> {
      return this.setUserInfosSubject.asObservable();
    }
}
