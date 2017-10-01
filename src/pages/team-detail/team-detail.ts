import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";
import { Team } from "../../app/shared/interfaces";

@IonicPage({ name: Globals.PAGE_NAMES.teamDetails })
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage implements OnInit {
  public team: Team;

  constructor(
    protected navParams: NavParams
  ) {}

  ngOnInit(): void {
    this.team = this.navParams.data.team;
  }

}
