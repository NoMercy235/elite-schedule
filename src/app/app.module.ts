import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPageModule } from "../pages/my-teams/my-teams.module";
import { TournamentsPageModule } from "../pages/tournaments/tournaments.module";
import { GamePageModule } from "../pages/game/game.module";
import { TeamDetailPageModule } from "../pages/team-detail/team-detail.module";
import { TeamsPageModule } from "../pages/teams/teams.module";

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { preloadModules: false, }),
    MyTeamsPageModule,
    GamePageModule,
    MyTeamsPageModule,
    TeamDetailPageModule,
    TournamentsPageModule,
    TeamsPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
