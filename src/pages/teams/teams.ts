import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";
import { Team } from "../../app/shared/interfaces";
import { TeamHomePage } from "../team-home/team-home";
import { EliteApiService } from "../../app/shared/elite-api.service";

@IonicPage({ name: Globals.PAGE_NAMES.teams })
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  teams = [];

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected eliteApi: EliteApiService,
  ) { }

  onItemClick(team: Team) {
    this.navCtrl.push(TeamHomePage, { team: team });
  }

  ionViewDidLoad(): void {
    const selectedTournament = this.navParams.data.tournament;
    this.eliteApi.getTournament(selectedTournament.id).subscribe((tournament: any) => {
      console.log(tournament);
      this.teams = tournament.teams;
    });
  }
}
