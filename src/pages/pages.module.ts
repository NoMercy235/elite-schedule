import { NgModule } from '@angular/core';
import { MyTeamsPageModule } from "./my-teams/my-teams.module";
import { GamePageModule } from "./game/game.module";
import { TeamDetailPageModule } from "./team-detail/team-detail.module";
import { TournamentsPageModule } from "./tournaments/tournaments.module";
import { TeamsPageModule } from "./teams/teams.module";
import { TeamHomePageModule } from "./team-home/team-home.module";
import { StandingsPageModule } from "./standings/standings.module";

@NgModule({
  imports: [
    MyTeamsPageModule,
    GamePageModule,
    MyTeamsPageModule,
    TeamDetailPageModule,
    TournamentsPageModule,
    TeamsPageModule,
    TeamHomePageModule,
    StandingsPageModule,
  ],
  exports: [],
  providers: [],
})
export class PagesModule {
}
