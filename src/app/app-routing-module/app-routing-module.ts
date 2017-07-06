import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from "../autoGuard/authentificationGuard";

import { PageNotFoundComponent } from '../../app/page-not-found/page-not-found.component';
import { HomePageComponent } from '../../app/home-page/home-page.component';
import { PlayerInfoPageComponent } from '../../app/player-info-page/player-info-page.component';
import { DraftedPageComponent } from '../../app/drafted-page/drafted-page.component';
import { LoginPageComponent } from '../../app/login-page/login-page.component';
import { CallbackComponent } from '../../app/callback/callback.component';

const appRoutes: Routes = [
  { path: 'home/drafted', component: DraftedPageComponent },
  { path: 'home', component: HomePageComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'login', component :LoginPageComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'playerInfo/:id', component: PlayerInfoPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
