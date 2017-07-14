import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { StatsSelectorComponent } from '../stats-selector/stats-selector.component';
import { IMPORTANT_STATS_ATTRS } from '../shared/const/service-constants';
import { StatsAttributes } from '../shared/interfaces/stats-attributes';
import { ImportantStatsService } from '../shared/services/importantStatsService';
import { PoolService } from '../shared/services/pool.service';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';

let util = require('util');

@Component({
  selector: 'app-user-overall-stats',
  templateUrl: './user-overall-stats.component.html',
  styleUrls: ['./user-overall-stats.component.css'],
})
export class UserOverallStatsComponent implements OnInit, OnDestroy {
  isAddOpponentActivated: boolean;
  importantStatsAttrs: StatsAttributes[];                        // Attributes necessary from stats selected for pool
  opponents: User[];
  currentUser: User;

  private addMemberServiceSubscription: Subscription;
  private importantStatsServiceSubscription: Subscription;

  constructor(private importantStatsService: ImportantStatsService,
              private poolService: PoolService) {
      this.importantStatsServiceSubscription = importantStatsService.getImportantStatsAttrsChangeEvent().subscribe(importantStatsAttrs => {
        console.log("Important stats in user overall section updated: " + util.inspect(importantStatsAttrs, false, null));
        this.importantStatsAttrs = importantStatsAttrs;
      });

      this.addMemberServiceSubscription = poolService.getAddMemberEvent().subscribe(pool => { 
        this.opponents = pool.members.filter(item => item._id !== this.currentUser._id);
      });

      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.currentUser);
  }

  ngOnInit() {
    this.importantStatsAttrs = this.importantStatsService.getImportantStatsAttrs();
    this.opponents = this.poolService.getCurrentPool().members.filter(item => item._id !== this.currentUser._id);

    this.isAddOpponentActivated = false;
  }

  ngOnDestroy() {
    this.importantStatsServiceSubscription.unsubscribe();
    this.addMemberServiceSubscription.unsubscribe();
  }

  onAddOpponentButtonClick() {
    this.isAddOpponentActivated = !this.isAddOpponentActivated;
  }
}
