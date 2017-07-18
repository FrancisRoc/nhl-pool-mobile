import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { environment } from '../../../environments/environment';
import { PoolService } from '../../../app/shared/services/pool.service';
import { StatsAttributes } from '../../../app/shared/interfaces/stats-attributes';
import { IMPORTANT_STATS_ATTRS } from '../../../app/shared/const/service-constants';
import * as localStorageIndexes from '../../../app/shared/const/localStorageIndexes';

let util = require('util');

@Injectable()
export class ImportantStatsService {
    private importantStatsAttrsChange: Subject<StatsAttributes[]>;
    private importantStatsAttrs: StatsAttributes[];

    constructor(private http: Http, private poolService: PoolService) {
      this.importantStatsAttrsChange = new Subject<StatsAttributes[]>();
    }

    saveDefaultImportantStats(poolId: string) {
      //Basic important stats set to goals, assists and points
      let importantStats: StatsAttributes[] = [
        new StatsAttributes("Goals", "isGoalsSelected", true),
        new StatsAttributes("Assists", "isAssistsSelected", true),
        new StatsAttributes("Points", "isPointsSelected", true),
        new StatsAttributes("+/-", "isPlusMinusSelected", false),
        new StatsAttributes("PIM", "isPIMSelected", false),
        new StatsAttributes("PPG", "isPPGSelected", false),
        new StatsAttributes("SHG", "isSHGSelected", false),
        new StatsAttributes("PPPS", "isPPPSelected", false),
        new StatsAttributes("SHP", "isSHPSelected", false),
        new StatsAttributes("Hits", "isHitsSelected", false)
      ];
      
      console.log("POST" + environment.apiUrl + 'api/nhl/poolApp/v1/pools/' + poolId + '/stats');
      this.http.post(environment.apiUrl + 'api/nhl/poolApp/v1/pools/' + poolId + '/stats', importantStats)
                .catch((error: any) => Observable.throw(error || 'Server error'))
                .subscribe();
    }

    changeIsCheckStat(statAttrs: StatsAttributes) {
      statAttrs.isCheck = !statAttrs.isCheck;
      this.importantStatsAttrsChange.next(this.importantStatsAttrs);
      
      //TODO update database for important stats
    }

    getImportantStatsAttrsChangeEvent(): Observable<StatsAttributes[]> {
      return this.importantStatsAttrsChange.asObservable();
    }

    getImportantStatsAttrs() {
      console.log("GET" + environment.apiUrl + 'api/nhl/poolApp/v1/pools/' + this.poolService.getCurrentPool()._id + '/stats');
      return this.http.get(environment.apiUrl + 'api/nhl/poolApp/v1/pools/' + this.poolService.getCurrentPool()._id + '/stats')
                      .map((response: Response) => response.json().importantStats)
                      .catch((error: any) => Observable.throw(error || 'Server error'))
    }
}
