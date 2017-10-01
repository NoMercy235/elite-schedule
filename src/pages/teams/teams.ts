import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";
import { TeamDetailPage } from "../team-detail/team-detail";
import { Team } from "../../app/shared/interfaces";

@IonicPage({ name: Globals.PAGE_NAMES.teams })
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams: Team[] = [
    { id: 1, name: 'HC Elite' },
    { id: 2, name: 'Team Takeover' },
    { id: 3, name: 'DC Thunder' },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onItemClick(ev: any, team: Team) {
    this.navCtrl.push(TeamDetailPage, { team: team });
  }

}
