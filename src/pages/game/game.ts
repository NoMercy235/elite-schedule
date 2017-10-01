import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";
import { EliteApiService } from "../../app/shared/elite-api.service";
import { TeamHomePage } from "../team-home/team-home";

declare const window: any;

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
    this.game.gameTime = Date.parse(this.game.time);
  }

  onTeamClick(teamId): void {
    const tournamentData = this.eliteApi.getTournamentData();
    const team = tournamentData.teams.find((t: any) => t.id === teamId);
    this.nav.push(TeamHomePage, { team: team });
  }

  goToDirections(){
    const tournamentData = this.eliteApi.getTournamentData();
    const location = tournamentData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  isWinner(score1, score2){
    return Number(score1) > Number(score2);
  }
}
