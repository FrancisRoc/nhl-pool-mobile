import { Component, OnInit, OnDestroy, Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { DTOStatsSelector } from '../../app/stats-selector/dto-stats-selector';
import { STAT_NAME_FROM_ABREVIATION } from '../../app/shared/const/service-constants';
import { PlayersIndividualStatsService } from '../../app/shared/services/playersIndividualStatsService';
import { IPlayerIndividualStat } from '../../app/shared/interfaces/playerIndividualStat';
import { OpponentsService } from '../../app/shared/services/opponentsService';
import { Opponent } from '../../app/add-opponent-form/opponent';

import * as localStorageIndexes from 'app/shared/const/localStorageIndexes';

var util = require('util');

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css'],
})

@Injectable()
export class PlayersListComponent implements OnInit, OnDestroy {
  playersIndividualStats: IPlayerIndividualStat[];          // Array containint all players with only one stat (ex: goals)
  private statNameFromAbreviation;                                  // Get stat name from abbreviation (ex: G = Goals)
  currentStatString:string;
  currentStatTag:string;
  private subscription: Subscription;
  opponents: Opponent[];
  
  constructor(private http: Http,
              private router: Router,
              private serveStatService: PlayersIndividualStatsService,
              private opponentService: OpponentsService) {
      this.subscription = opponentService.getAddOpponentEvent().subscribe(opponents => {
          this.opponents = opponents;
      })
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

    this.opponents = this.opponentService.getOpponents();
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

  playerDraftBy(event) {
    //TODO.
  }

  saveData() {
    localStorage.setItem(localStorageIndexes.PLAYER_LIST_PLAYER_STATS, JSON.stringify(this.playersIndividualStats));
    localStorage.setItem(localStorageIndexes.PLAYER_LIST_CURRENT_STAT_STRING, this.currentStatString);
    localStorage.setItem(localStorageIndexes.PLAYER_LIST_CURRENT_STAT_TAG, this.currentStatTag);
  }
}

