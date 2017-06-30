import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent } from './app.component';
import { ToolBar } from './shared/component/toolbar/toolbar.component';
import { AppHeader } from './shared/component/header/app-header.component';
import { StatsSelectorComponent } from './stats-selector/stats-selector.component';
import { UserOverallStatsComponent } from './user-overall-stats/user-overall-stats.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { AddOpponentFormComponent } from './add-opponent-form/add-opponent-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PlayerInfoPageComponent } from './player-info-page/player-info-page.component';
import { AppRoutingModule } from './app-routing-module/app-routing-module';
import { DraftedPageComponent } from './drafted-page/drafted-page.component';
import { PlayersIndividualStatsService } from '../app/shared/services/playersIndividualStatsService';
import { ImportantStatsService } from '../app/shared/services/importantStatsService';
import { OpponentsService } from '../app/shared/services/opponentsService';
import { PlayersInfoService } from '../app/shared/services/playerInfoService';
import { DraftPlayerService } from '../app/shared/services/draftPlayerService';
import { AuthService } from '../app/shared/services/authentificationService';
import { AuthGuard } from '../app/autoGuard/authentificationGuard';

import { LoginPageComponent } from './login-page/login-page.component';
import { CallbackComponent } from './callback/callback.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolBar,
    AppHeader,
    StatsSelectorComponent,
    UserOverallStatsComponent,
    PlayersListComponent,
    AddOpponentFormComponent,
    PageNotFoundComponent,
    HomePageComponent,
    PlayerInfoPageComponent,
    DraftedPageComponent,
    LoginPageComponent,
    CallbackComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    PlayersIndividualStatsService,
    OpponentsService,
    ImportantStatsService,
    PlayersInfoService,
    DraftPlayerService,
    AuthService,
    AUTH_PROVIDERS,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
