import { Component, OnInit } from '@angular/core';
import { StatsSelectorComponent } from '../../app/stats-selector/stats-selector.component';
import { UserOverallStatsComponent } from '../../app/user-overall-stats/user-overall-stats.component';
import { STAT_FROM_BOOLEAN } from '../../app/shared/const/service-constants';
import { StatsAttributes } from '../../app/shared/interfaces/stats-attributes';
import { IPoolStats } from '../../app/shared/interfaces/poolStats';
import { DTOStatsSelector } from '../../app/stats-selector/dto-stats-selector';
import { ImportantStatsService } from '../../app/shared/services/importantStatsService';
import { PoolService } from '../../app/shared/services/pool.service';
import { PoolResponse } from '../../app/shared/models/poolResponse';

//import * as localStorageIndexes from '../../app/shared/const/localStorageIndexes';

const util = require('util');

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private statDictionary;           // Get stat name from boolean string (ex: isGoalsSelected = Goals)
  importantStatsAttrs: StatsAttributes[];
  currentStat: string;                     // Current stat selected in dropdown button
  currentPool: PoolResponse;

  constructor(private importantStatsService: ImportantStatsService, private poolService: PoolService) {
  }

  ngOnInit() {
    this.statDictionary = STAT_FROM_BOOLEAN;

    this.importantStatsService.getPoolStatsAttrs().subscribe((poolStats: IPoolStats) => {
        console.log("Pool important stats attributes updated in home page dropdown: " + util.inspect(poolStats, false, null))
        this.importantStatsAttrs = poolStats.importantStats;
        this.currentStat = poolStats.currentStat;
    });

    this.currentPool = this.poolService.getCurrentPool();
  }

  // TODO hide choice instead of removing from list
  toggleSelectedStat(event) {
    this.addStatToDropdownMenu(event);
  }

  private addStatToDropdownMenu(event) {
    // Show or hide stat in dropdown
    event.hide = !event.hide;
    // Stat has been selected or not?
    if (event.isCheck) {
      // Add to dropdown choices
      console.log("ADD " + util.inspect(event, false, null) + " IN DROPDOWN");
      this.importantStatsAttrs.push(event);
    } else {
      console.log("REMOVE " + util.inspect(event, false, null) + " IN DROPDOWN");
      // Remove from dropdown choices
      this.importantStatsAttrs = this.importantStatsAttrs.filter(item => item.name !== event.name);

      // If current stat in dropdown replace with overall
      if (this.currentStat === event.statName) {
        this.currentStat = "Overall";
        //update current stat mongo
        this.importantStatsService.updateCurrentStat(this.currentPool._id ,this.currentStat);
        //localStorage.setItem(localStorageIndexes.HOME_PAGE_CURRENT_STAT, this.currentStat);
      }
    }
    // update important stats in mongodb
    this.importantStatsService.updateImportantStats(this.currentPool._id , this.importantStatsAttrs);
    //localStorage.setItem(localStorageIndexes.HOME_PAGE_STATS_IN_DROPDOWN, JSON.stringify(this.statsInDropdown));
  }

  setDropdownCurrentStat(stat) {
    //Show current stat in dropdown to display new selected stat
    for (let i = 0; i < this.importantStatsAttrs.length; i++) {
      if (this.importantStatsAttrs[i].name === this.currentStat) {
        this.importantStatsAttrs[i].hide = !this.importantStatsAttrs[i].hide;
        //currentStatObj.isCheck = !currentStatObj.isCheck;
      } else if (this.importantStatsAttrs[i].name === stat) {
        //Hide new current stat in dropdown menu
        this.importantStatsAttrs[i].hide = !this.importantStatsAttrs[i].hide;
      }
    }
    this.currentStat = stat;
    // update mongo
    this.importantStatsService.updateCurrentStat(this.currentPool._id ,this.currentStat);    
    //localStorage.setItem(localStorageIndexes.HOME_PAGE_CURRENT_STAT, this.currentStat);

    // update important stats in mongodb
    this.importantStatsService.updateImportantStats(this.currentPool._id , this.importantStatsAttrs);
    //localStorage.setItem(localStorageIndexes.HOME_PAGE_STATS_IN_DROPDOWN, JSON.stringify(this.statsInDropdown));
  }
}
