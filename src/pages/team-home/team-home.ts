import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TeamDetailPage } from "../team-detail/team-detail";
import { StandingsPage } from "../standings/standings";
import { Team } from "../../app/shared/interfaces";

@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  public teamDetailsTab = TeamDetailPage;
  public standingsTab = StandingsPage;
  public team: Team;

  constructor(
    protected navCtrl: NavController,
    protected navParams: NavParams
  ) {
    this.team = this.navParams.data.team;
  }

  goHome(): void {
    this.navCtrl.popToRoot();
  }
}
