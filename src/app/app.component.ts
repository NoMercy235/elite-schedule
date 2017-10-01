import { Component, ViewChild } from '@angular/core';
import { Events, LoadingController, NavController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage } from "../pages/my-teams/my-teams";
import { TournamentsPage } from "../pages/tournaments/tournaments";
import { UserSettingsService } from "./shared/user-settings.service";
import { TeamHomePage } from "../pages/team-home/team-home";
import { EliteApiService } from "./shared/elite-api.service";
import { Globals } from "./shared/globals";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') navCtrl: NavController;

  rootPage: any = MyTeamsPage;
  favTeams: any[];

  constructor(
    protected platform: Platform,
    protected statusBar: StatusBar,
    protected splashScreen: SplashScreen,
    protected userSettings: UserSettingsService,
    protected loadingCtrl: LoadingController,
    protected eliteApi: EliteApiService,
    protected events: Events,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.refreshFavs();
    this.events.subscribe(Globals.EVENTS.userSettings.favChanged, (data) => {
      this.refreshFavs();
    });
  }

  refreshFavs(): void {
    this.userSettings.getAllFavs().then((data: any[]) => {
      this.favTeams = data;
    });
  }

  goHome(): void {
    this.navCtrl.push(MyTeamsPage);
  }

  goToTournaments(): void {
    this.navCtrl.push(TournamentsPage);
  }

  goToTeam(fav: any): void {
    const loader = this.loadingCtrl.create({
      content: 'Getting data...',
    });
    loader.present().then(() => {
      this.eliteApi.getTournament(fav.tournamentId).subscribe((res: any) => {
        this.navCtrl.push(TeamHomePage, { team: fav.team }).then(() => {
          loader.dismiss();
        });
      });
    });
  }
}
