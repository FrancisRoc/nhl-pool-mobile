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
  members: User[];
  private currentUser: User;

  constructor(private http: Http,
    private router: Router,
    private poolService: PoolService,
    private serveStatService: PlayersIndividualStatsService,
    private draftPlayerService: DraftPlayerService) {
    this.subscription = poolService.getAddMemberEvent().subscribe(pool => {
      console.log("Update pool members: " + util.inspect(pool.members, false, null));
      this.members = pool.members;
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
    this.getPlayerStat("Overall");    
    this.members = this.poolService.getCurrentPool().members;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPlayerStat(statSelected) {
    this.currentStatString = this.statNameFromAbreviation[statSelected];
    this.currentStatTag = statSelected;
    this.serveStatService.requestPlayersStats(this.currentStatString)
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

  playerDraftBy(opponent, playerId) {
    console.log("Player with id " + playerId + " drafted by: " + opponent);
    this.draftPlayerService.draftPlayer(playerId);

    // Remove from players list
    this.playersIndividualStats = this.playersIndividualStats.filter(item => item.player.ID !== playerId);
  }

  saveData() {
    localStorage.setItem(localStorageIndexes.PLAYER_LIST_PLAYER_STATS, JSON.stringify(this.playersIndividualStats));
    localStorage.setItem(localStorageIndexes.PLAYER_LIST_CURRENT_STAT_STRING, this.currentStatString);
    localStorage.setItem(localStorageIndexes.PLAYER_LIST_CURRENT_STAT_TAG, this.currentStatTag);
  }
}

