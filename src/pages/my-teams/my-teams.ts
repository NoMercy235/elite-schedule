import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
import { TournamentsPage } from "../tournaments/tournaments";
import { Globals } from "../../app/shared/globals";
import { EliteApiService } from "../../app/shared/elite-api.service";
import {TeamHomePage} from "../team-home/team-home";

@IonicPage({ name: Globals.PAGE_NAMES.myTeams })
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {
  public favourites: any[] = [
    {
      team: { id: 6182, name: 'HC Elite', coach: 'smt'},
      tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
      tournamentName: 'March Madness Tournament',
    },
  ];

  constructor(
    protected navCtrl: NavController,
    protected loadingCtrl: LoadingController,
    protected eliteApi: EliteApiService,
  ) { }

  goToTournaments(): void {
    this.navCtrl.push(TournamentsPage);
  }

  onFacClick(fav: any): void {
    const loader = this.loadingCtrl.create({
      content: 'Getting data...',
      dismissOnPageChange: true,
    });

    loader.present().then(() => {
      this.eliteApi.getTournament(fav.tournamentId).subscribe((t: any) => {
        this.navCtrl.push(TeamHomePage, { team: fav.team });
        loader.dismiss();
      });
    });
  }
}
