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
  playerInfos: Player.PlayerInfo[] = [];

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
    let year: number;
    for (let i = 0; i < 4; i++) {
      year = 2014 + i;
      this.route.params
            .switchMap((params: Params) => this.playerInfoService.requestPlayerInfo(params['id'], year))
            .subscribe((playerInfos: Player.PlayerInfo) => {
              this.playerInfos.push(playerInfos[0]);
              if (playerInfos[0] !== undefined) {
                this.isLoaded2014 = true;
              }
          });
    }
  }

}
