import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from 'app/page-not-found/page-not-found.component';
import { HomePageComponent } from 'app/home-page/home-page.component';
import { PlayerInfoPageComponent } from 'app/player-info-page/player-info-page.component';
import { DraftedPageComponent } from 'app/drafted-page/drafted-page.component';

const appRoutes: Routes = [
  { path: 'home/drafted', component: DraftedPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'playerInfo/:id', component: PlayerInfoPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
