import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";
import { EliteApiService } from "../../app/shared/elite-api.service";
import { TeamHomePage } from "../team-home/team-home";

@IonicPage({ name: Globals.PAGE_NAMES.game })
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public game: any;

  constructor(
    protected nav: NavController,
    protected navParams: NavParams,
    protected eliteApi: EliteApiService,
  ) {
    this.game = this.navParams.data.game;
    console.log(this.game);
  }

  onTeamClick(teamId): void {
    const tournamentData = this.eliteApi.getTournamentData();
    const team = tournamentData.teams.find((t: any) => t.id === teamId);
    this.nav.push(TeamHomePage, { team: team });
  }
}
