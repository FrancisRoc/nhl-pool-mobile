import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions } from '@angular/http';

//import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
//import { MdCardModule } from '@angular2-material/card';
//import { MdButtonModule } from '@angular2-material/button';
//import { MdCheckboxModule } from '@angular2-material/checkbox';
//import { MdGridListModule } from '@angular2-material/grid-list';

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
import { UserService } from '../app/shared/services/user.service';
import { AuthenticationService } from '../app/shared/services/authentification.service';
import { AlertService } from '../app/shared/services/alert.service';
import { UserSearchService } from '../app/shared/services/user-search.service';
import { PoolService } from '../app/shared/services/pool.service';
import { CustomHttp } from '../app/shared/services/http/custom-http';
import { AuthGuard } from '../app/autoGuard/auth.guard';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AlertComponent } from './shared/component/alert/alert.component';
import { PoolPresetationPageComponent } from './pool-presetation-page/pool-presetation-page.component';
import { SearchOpponentComponent } from './search-opponent/search-opponent.component';

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
    RegisterPageComponent,
    AlertComponent,
    PoolPresetationPageComponent,
    SearchOpponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    PlayersIndividualStatsService,
    ImportantStatsService,
    OpponentsService,
    PlayersInfoService,
    DraftPlayerService,
    UserService,
    AuthenticationService,
    AlertService,
    UserSearchService,
    PoolService,
    CustomHttp,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
