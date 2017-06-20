import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { IPlayerIndividualStat } from 'app/shared/interfaces/playerIndividualStat';
let util = require('util');

@Injectable()
export class PlayersIndividualStatsService {
    constructor(private http: Http) {}

    requestPlayersStats(statToGet: string): Observable<IPlayerIndividualStat[]> {
        console.log("Send request: http://localhost:12345/api/nhl/poolApp/v1/players/stats/" + statToGet);
        return this.http.get('http://localhost:12345/api/nhl/poolApp/v1/players/stats/' + statToGet)
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