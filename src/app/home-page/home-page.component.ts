import { Component, OnInit } from '@angular/core';
import { StatsSelectorComponent } from '../../app/stats-selector/stats-selector.component';
import { UserOverallStatsComponent } from '../../app/user-overall-stats/user-overall-stats.component';
import { STAT_FROM_BOOLEAN } from '../../app/shared/const/service-constants';
import { IDropdownStatInfo } from '../../app/shared/interfaces/dropdownStatInfo';
import { DTOStatsSelector } from '../../app/stats-selector/dto-stats-selector';
import { ImportantStatsService } from '../../app/shared/services/importantStatsService';
import * as localStorageIndexes from '../../app/shared/const/localStorageIndexes';

const util = require('util');

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private statDictionary;           // Get stat name from boolean string (ex: isGoalsSelected = Goals)
  statsInDropdown: IDropdownStatInfo[];         // Stat names presented in dropdown menu
  currentStat: string;                          // Current stat selected in dropdown button

  constructor() {
  }

  ngOnInit() {
    this.statDictionary = STAT_FROM_BOOLEAN;

    let recoverStatsInDropdown: IDropdownStatInfo[] = JSON.parse(localStorage.getItem(localStorageIndexes.HOME_PAGE_STATS_IN_DROPDOWN));
    if (recoverStatsInDropdown) {
      this.statsInDropdown = recoverStatsInDropdown;
    } else {
      this.statsInDropdown = [ {statName: "Overall", hide: true} ];
    }

    let recoverCurrentStat: string = localStorage.getItem(localStorageIndexes.HOME_PAGE_CURRENT_STAT);
    if (recoverCurrentStat) {
      this.currentStat = recoverCurrentStat;
    } else {
      this.currentStat = "Overall";
    }
  }

  // TODO hide choice instead of removing from list
  toggleSelectedStat(event) {
    this.addStatToDropdownMenu(event);
  }

  private addStatToDropdownMenu(event) {
    let statInfo = {
        statName: this.statDictionary[event.selectorName],
        hide: false
    }
    if (event.isCheck) {
      // Add to dropdown choices
      console.log("ADD " + util.inspect(statInfo, false, null) + "IN DROPDOWN");
      this.statsInDropdown.push(statInfo);
    } else {
      // Remove from dropdown choices
      this.statsInDropdown = this.statsInDropdown.filter(item => item.statName !== statInfo.statName);

      // If current stat in dropdown replace with overall
      if (this.currentStat === statInfo.statName) {
        this.currentStat = "Overall";
        this.statsInDropdown = this.statsInDropdown.filter(item => item.statName !== this.currentStat);
        localStorage.setItem(localStorageIndexes.HOME_PAGE_CURRENT_STAT, this.currentStat);
      }
    }
    localStorage.setItem(localStorageIndexes.HOME_PAGE_STATS_IN_DROPDOWN, JSON.stringify(this.statsInDropdown));
  }

  setDropdownCurrentStat(stat) {
    var currentStatObj: IDropdownStatInfo;
    //Show current stat in dropdown to display new selected stat
    for (let i = 0; i < this.statsInDropdown.length; i++) {
      if (this.statsInDropdown[i].statName === this.currentStat) {
        currentStatObj = this.statsInDropdown[i];
        currentStatObj.hide = !currentStatObj.hide;
        break;
      }
    }
    //Hide new current stat in dropdown menu
    for (let i = 0; i < this.statsInDropdown.length; i++) {
      if (this.statsInDropdown[i].statName === stat) {
        currentStatObj = this.statsInDropdown[i];
        currentStatObj.hide = !currentStatObj.hide;
        break;
      }
    }
    this.currentStat = stat;
    localStorage.setItem(localStorageIndexes.HOME_PAGE_CURRENT_STAT, this.currentStat);
    localStorage.setItem(localStorageIndexes.HOME_PAGE_STATS_IN_DROPDOWN, JSON.stringify(this.statsInDropdown));
  }
}
