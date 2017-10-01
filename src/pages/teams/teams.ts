import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";
import { Team } from "../../app/shared/interfaces";
import { TeamHomePage } from "../team-home/team-home";
import { EliteApiService } from "../../app/shared/elite-api.service";

import * as _ from 'lodash';

@IonicPage({ name: Globals.PAGE_NAMES.teams })
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  public allTeams: any[];
  public allTeamDivisions: any[];
  teams = [];

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected eliteApi: EliteApiService,
    protected loadingCtrl: LoadingController,
  ) {
    this.init();
  }

  onItemClick(team: Team) {
    this.navCtrl.push(TeamHomePage, { team: team });
  }

  init(): void {
    const selectedTournament = this.navParams.data.tournament;
    const loader = this.loadingCtrl.create({
      content: 'Getting data...',
    });

    loader.present().then(() => {
      this.eliteApi.getTournament(selectedTournament.id).subscribe((tournament: any) => {
        this.allTeams = tournament.teams;
        this.allTeamDivisions =
          _.chain(tournament.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();
        this.teams = this.allTeamDivisions;
        loader.dismiss();
      });
    });
  }
}
