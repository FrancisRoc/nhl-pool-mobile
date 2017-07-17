import { Component, OnInit, OnDestroy, Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { DTOStatsSelector } from '../../app/stats-selector/dto-stats-selector';
import { STAT_NAME_FROM_ABREVIATION } from '../../app/shared/const/service-constants';
import { PlayersIndividualStatsService } from '../../app/shared/services/playersIndividualStatsService';
import { IPlayerIndividualStat } from '../../app/shared/interfaces/playerIndividualStat';
import { PoolService } from '../../app/shared/services/pool.service';
import { DraftPlayerService } from '../shared/services/draftPlayerService';
import { User } from '../shared/models/user';
import { playerListStatsLabels, playerListStatsNames } from "../shared/const/constants";

import { PoolResponse } from '../../app/shared/models/poolResponse';

import * as localStorageIndexes from 'app/shared/const/localStorageIndexes';

var util = require('util');

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css'],
})

@Injectable()
export class PlayersListComponent implements OnInit, OnDestroy {
  playersIndividualStats: any[]; //TODO USE PLAYER.PLAYERINFO INTERFACE         // Array containint all players with only one stat (ex: goals)
  private statNameFromAbreviation;                                  // Get stat name from abbreviation (ex: G = Goals)
  currentStatString: string;
  currentStatTag: string;
  private subscription: Subscription;
  private currentUser: User;
  private currentPool: PoolResponse;
  playerListStatsLabels: string[] = playerListStatsLabels;
  playerListStatsNames: string[] = playerListStatsNames;

  constructor(private http: Http,
    private router: Router,
    private poolService: PoolService,
    private serveStatService: PlayersIndividualStatsService,
    private draftPlayerService: DraftPlayerService) {
    this.subscription = poolService.getAddMemberEvent().subscribe(pool => {
      console.log("Update pool members: " + util.inspect(pool, false, null));
      this.currentPool = pool;
    })
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    let recoverPlayersStats: IPlayerIndividualStat[] = JSON.parse(localStorage.getItem(localStorageIndexes.PLAYER_LIST_PLAYER_STATS));
    if (recoverPlayersStats) {
      this.playersIndividualStats = recoverPlayersStats;
    } else {
      this.playersIndividualStats = [];
    }

    this.statNameFromAbreviation = STAT_NAME_FROM_ABREVIATION;

    let recoverCurrentStatString: string = localStorage.getItem(localStorageIndexes.PLAYER_LIST_CURRENT_STAT_STRING);
    if (recoverCurrentStatString) {
      this.currentStatString = recoverCurrentStatString;
    } else {
      this.currentStatString = "";
    }

    let recoverCurrentStatTag: string = localStorage.getItem(localStorageIndexes.PLAYER_LIST_CURRENT_STAT_TAG);
    if (recoverCurrentStatTag) {
      this.currentStatTag = recoverCurrentStatTag;
    } else {
      this.currentStatTag = "";
    }

    this.currentPool = this.poolService.getCurrentPool();

    if (this.currentStatTag) {
      this.getPlayerStat(this.currentStatTag);
    } else {
      this.getPlayerStat("Overall");
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPlayerStat(statSelected) {
    this.currentStatString = this.statNameFromAbreviation[statSelected];
    this.currentStatTag = statSelected;
    this.serveStatService.requestPlayersStats(this.currentStatString, this.currentPool._id)
      .subscribe(
      stats => {
        this.playersIndividualStats = stats;
        this.saveData();
      });
    //error =>  this.errorMessage = <any>error); //TODO
  }

  onPlayerSelect(player) {
    // Navigate to player infos page
    this.router.navigate(['/playerInfo', player.player.ID]);
  }

  playerDraftBy(userId: string, playerId: string) {
    console.log("Player with id " + playerId + " drafted by: " + userId);
    this.draftPlayerService.draftPlayer(userId, this.currentPool._id, playerId);

    // Remove from players list
    this.playersIndividualStats = this.playersIndividualStats.filter(item => item.player.ID !== playerId);
  }

  saveData() {
    localStorage.setItem(localStorageIndexes.PLAYER_LIST_PLAYER_STATS, JSON.stringify(this.playersIndividualStats));
    localStorage.setItem(localStorageIndexes.PLAYER_LIST_CURRENT_STAT_STRING, this.currentStatString);
    localStorage.setItem(localStorageIndexes.PLAYER_LIST_CURRENT_STAT_TAG, this.currentStatTag);
  }

  getStyle(statName: string): string {
    if (this.currentStatString === statName) {
      return "bold";
    } else {
      return "normal";
    }
  }
}

