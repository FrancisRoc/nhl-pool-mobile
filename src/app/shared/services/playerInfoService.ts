import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import * as Player from '../../../app/shared/interfaces/playerInfo';
let util = require('util');

@Injectable()
export class PlayersInfoService {
    constructor(private http: Http) {}

    requestPlayerInfo(id: string, year: number): Observable<Player.PlayerInfo> {
        console.log("Send request: https://nhlpoolhelperapi.herokuapp.com/api/nhl/poolApp/v1/players/stats/player/" + id + "/" + year);
        return this.http.get('https://nhlpoolhelperapi.herokuapp.com/api/nhl/poolApp/v1/players/stats/player/' + id + "/" + year)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
        errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}