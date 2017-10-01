import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApiService } from "../../app/shared/elite-api.service";

import * as _ from 'lodash';

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  public allStandings: any[];
  public standings: any[];
  public team: any[];

  public standingCols = [
    { label: 'Wins', name: 'wins' },
    { label: 'Losses', name: 'losses' },
    { label: 'Pct', name: 'winningPct' },
    { label: 'PF', name: 'pointsFor' },
    { label: 'PA', name: 'pointsAgainst' },
    { label: 'Diff', name: 'pointsDiff' },
  ];

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams,
    protected eliteApi: EliteApiService,
  ) {
    this.team = this.navParams.data;
    const tournament = this.eliteApi.getTournamentData();
    this.standings = tournament.standings;

    this.allStandings =
       _.chain(this.standings)
         .groupBy('division')
         .toPairs()
         .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
         .value();

  }

}
