import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";
import { TeamsPage } from "../teams/teams";
import { EliteApiService } from "../../app/shared/elite-api.service";

@IonicPage({ name: Globals.PAGE_NAMES.tournaments })
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  public tournaments: any[];

  constructor(
    protected navCtrl: NavController,
    protected eliteApi: EliteApiService,
    protected loadingCtrl: LoadingController,
  ) {}

  onItemClick(tournament: any): void {
    this.navCtrl.push(TeamsPage, { tournament: tournament });
  }

  ionViewDidLoad(): void {
    const loader = this.loadingCtrl.create({
      content: 'Getting tournaments...',
    });

    loader.present().then(() => {
      this.eliteApi.getTournaments().then((data: any[]) => {
        this.tournaments = data;
        loader.dismiss();
      });
    });
  }
}
