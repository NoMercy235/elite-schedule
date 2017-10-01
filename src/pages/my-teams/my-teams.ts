import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TournamentsPage } from "../tournaments/tournaments";
import { Globals } from "../../app/shared/globals";

@IonicPage({ name: Globals.PAGE_NAMES.myTeams })
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToTournaments(): void {
    this.navCtrl.push(TournamentsPage);
  }
}
