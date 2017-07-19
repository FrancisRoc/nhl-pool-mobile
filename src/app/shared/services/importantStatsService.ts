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
        new StatsAttributes("Goals", "isGoalsSelected", true, false),
        new StatsAttributes("Assists", "isAssistsSelected", true, false),
        new StatsAttributes("Points", "isPointsSelected", true, false),
        new StatsAttributes("+/-", "isPlusMinusSelected", false, true),
        new StatsAttributes("PIM", "isPIMSelected", false, true),
        new StatsAttributes("PPG", "isPPGSelected", false, true),
        new StatsAttributes("SHG", "isSHGSelected", false, true),
        new StatsAttributes("PPPS", "isPPPSelected", false, true),
        new StatsAttributes("SHP", "isSHPSelected", false, true),
        new StatsAttributes("Hits", "isHitsSelected", false, true)
      ];
      
      console.log("POST" + environment.apiUrl + 'api/nhl/poolApp/v1/pools/' + poolId + '/stats');
      this.http.post(environment.apiUrl + 'api/nhl/poolApp/v1/pools/' + poolId + '/stats', importantStats)
                .catch((error: any) => Observable.throw(error || 'Server error'))
                .subscribe();
    }

    changeIsCheckStat(statAttrs: StatsAttributes) {
      var currentStatObj: StatsAttributes;
      for (let i = 0; i < this.importantStatsAttrs.length; i++) {
        if (this.importantStatsAttrs[i].name === statAttrs.name) {
          currentStatObj = this.importantStatsAttrs[i];
          currentStatObj.isCheck = !currentStatObj.isCheck;
        }
      }
      this.importantStatsAttrsChange.next(this.importantStatsAttrs);
      
      //TODO update database for important stats
    }

    getImportantStatsAttrsChangeEvent(): Observable<StatsAttributes[]> {
      return this.importantStatsAttrsChange.asObservable();
    }

    getImportantStatsAttrs() {
      console.log("GET" + environment.apiUrl + 'api/nhl/poolApp/v1/pools/' + this.poolService.getCurrentPool()._id + '/stats');
      return this.http.get(environment.apiUrl + 'api/nhl/poolApp/v1/pools/' + this.poolService.getCurrentPool()._id + '/stats')
                      .map((response: Response) => this.importantStatsAttrs = response.json().importantStats)
                      .catch((error: any) => Observable.throw(error || 'Server error'))
    }
}
