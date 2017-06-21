import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { PlayersInfoService } from '../../app/shared/services/playerInfoService';
import * as Player from '../../app/shared/interfaces/playerInfo';

let util = require('util');

@Component({
  selector: 'app-player-info-page',
  templateUrl: './player-info-page.component.html',
  styleUrls: ['./player-info-page.component.css'],
})
export class PlayerInfoPageComponent implements OnInit {
  playerInfos2014: Player.PlayerInfo = null;
  playerInfos2015: Player.PlayerInfo = null;
  playerInfos2016: Player.PlayerInfo = null;
  playerInfos2017: Player.PlayerInfo = null;

  isLoaded2014: boolean = false;
  isLoaded2015: boolean = false;
  isLoaded2016: boolean = false;
  isLoaded2017: boolean = false;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private playerInfoService: PlayersInfoService
    ) {}

  ngOnInit() {
    this.getPlayerInfos();
  }

  goBack() {
        this.location.back();
  }

  getPlayerInfos() {
    this.route.params
          .switchMap((params: Params) => this.playerInfoService.requestPlayerInfo(params['id'], 2014))
          .subscribe((playerInfos: Player.PlayerInfo) => {
            this.playerInfos2014 = playerInfos[0]
            if (playerInfos[0] !== undefined) {
              this.isLoaded2014 = true;
            }
        });
    this.route.params
          .switchMap((params: Params) => this.playerInfoService.requestPlayerInfo(params['id'], 2015))
          .subscribe((playerInfos: Player.PlayerInfo) => {
            this.playerInfos2015 = playerInfos[0]
            if (playerInfos[0] !== undefined) {
              this.isLoaded2015 = true;
            }
        });
    this.route.params
          .switchMap((params: Params) => this.playerInfoService.requestPlayerInfo(params['id'], 2016))
          .subscribe((playerInfos: Player.PlayerInfo) => {
            this.playerInfos2016 = playerInfos[0]
            if (playerInfos[0] !== undefined) {
              this.isLoaded2016 = true;
            }
        });
    this.route.params
          .switchMap((params: Params) => this.playerInfoService.requestPlayerInfo(params['id'], 2017))
          .subscribe((playerInfos: Player.PlayerInfo) => {
            this.playerInfos2017 = playerInfos[0]
            if (playerInfos[0] !== undefined) {
              this.isLoaded2017 = true;
            }
        });
  }

}
