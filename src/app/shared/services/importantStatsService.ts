import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { StatsAttributes } from '../../../app/shared/interfaces/stats-attributes';
import { IMPORTANT_STATS_ATTRS } from '../../../app/shared/const/service-constants';
import * as localStorageIndexes from '../../../app/shared/const/localStorageIndexes';

let util = require('util');

@Injectable()
export class ImportantStatsService {
    private importantStatsAttrsChange: Subject<StatsAttributes[]>;
    private importantStatsAttrs: StatsAttributes[];

    constructor() {
      this.importantStatsAttrsChange = new Subject<StatsAttributes[]>();
      let recoverImportantStatsAttrs: StatsAttributes[] = JSON.parse(localStorage.getItem(localStorageIndexes.SERVICE_IMPORTANT_STATS_ATTRS));
      if (recoverImportantStatsAttrs) {
        this.importantStatsAttrs = recoverImportantStatsAttrs;
      } else {
        this.importantStatsAttrs = IMPORTANT_STATS_ATTRS;
      }
    }

    changeIsCheckStat(statAttrs: StatsAttributes) {
      statAttrs.isCheck = !statAttrs.isCheck;
      this.importantStatsAttrsChange.next(this.importantStatsAttrs);
      localStorage.setItem(localStorageIndexes.SERVICE_IMPORTANT_STATS_ATTRS, JSON.stringify(this.importantStatsAttrs));
    }

    getImportantStatsAttrsChangeEvent(): Observable<StatsAttributes[]> {
      return this.importantStatsAttrsChange.asObservable();
    }

    getImportantStatsAttrs() {
      return this.importantStatsAttrs;
    }
}
