import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StatsSelectorComponent } from '../../app/stats-selector/stats-selector.component';
import { IMPORTANT_STATS_ATTRS } from '../../app/shared/const/service-constants';
import { Opponent } from '../../app/add-opponent-form/opponent';
import { OpponentsService } from '../../app/shared/services/opponentsService';
import { StatsAttributes } from '../../app/shared/interfaces/stats-attributes';
import { ImportantStatsService } from '../../app/shared/services/importantStatsService';

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
