import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from '../../app/page-not-found/page-not-found.component';
import { HomePageComponent } from '../../app/home-page/home-page.component';
import { PlayerInfoPageComponent } from '../../app/player-info-page/player-info-page.component';
import { DraftedPageComponent } from '../../app/drafted-page/drafted-page.component';
import { LoginPageComponent } from '../../app/login-page/login-page.component';
import { RegisterPageComponent } from '../../app/register-page/register-page.component';
import { PoolPresetationPageComponent } from '../../app/pool-presetation-page/pool-presetation-page.component';

import { AuthGuard } from '../autoGuard/auth.guard';

const appRoutes: Routes = [
  { path: 'drafted', component: DraftedPageComponent },
  { path: 'pools', component: PoolPresetationPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
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
