import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StatsSelectorComponent } from '../stats-selector/stats-selector.component';
import { IMPORTANT_STATS_ATTRS } from '../shared/const/service-constants';
import { Opponent } from '../add-opponent-form/opponent';
import { OpponentsService } from '../shared/services/opponentsService';
import { StatsAttributes } from '../shared/interfaces/stats-attributes';
import { ImportantStatsService } from '../shared/services/importantStatsService';
import { UserService } from '../shared/services/user.service';
import { IUserInfos } from '../shared/interfaces/userInfos';

let util = require('util');

@Component({
  selector: 'app-user-overall-stats',
  templateUrl: './user-overall-stats.component.html',
  styleUrls: ['./user-overall-stats.component.css'],
})
export class UserOverallStatsComponent implements OnInit, OnDestroy {
  isAddOpponentActivated: boolean;
  importantStatsAttrs: StatsAttributes[];                        // Attributes necessary from stats selected for pool
  opponents: Opponent[];
  userInfos: IUserInfos = null;

  private opponentServiceSubscription: Subscription;
  private importantStatsServiceSubscription: Subscription;

  constructor(private importantStatsService: ImportantStatsService,
              private opponentService: OpponentsService) {
      this.importantStatsServiceSubscription = importantStatsService.getImportantStatsAttrsChangeEvent().subscribe(importantStatsAttrs => {
        console.log("Important stats in user overall section updated: " + util.inspect(importantStatsAttrs, false, null));
        this.importantStatsAttrs = importantStatsAttrs;
      });

      this.opponentServiceSubscription = opponentService.getAddOpponentEvent().subscribe(opponents => {
        this.opponents = opponents;
      });
  }

  ngOnInit() {
    this.importantStatsAttrs = this.importantStatsService.getImportantStatsAttrs();
    this.opponents = this.opponentService.getOpponents();

    this.isAddOpponentActivated = false;
  }

  ngOnDestroy() {
    this.opponentServiceSubscription.unsubscribe();
    this.importantStatsServiceSubscription.unsubscribe();
  }

  onAddOpponentButtonClick() {
    this.isAddOpponentActivated = !this.isAddOpponentActivated;
  }
}
