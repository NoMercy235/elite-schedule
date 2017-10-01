import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";
import { TeamsPage } from "../teams/teams";

@IonicPage({ name: Globals.PAGE_NAMES.tournaments })
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onItemClick(): void {
    this.navCtrl.push(TeamsPage);
  }

}
