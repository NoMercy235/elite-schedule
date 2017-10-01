import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";
import { Team } from "../../app/shared/interfaces";
import { EliteApiService } from "../../app/shared/elite-api.service";
import { GamePage } from "../game/game";

import * as moment from 'moment';

@IonicPage({ name: Globals.PAGE_NAMES.teamDetails })
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  public team: Team;
  public games: any[];
  public allGames: any[];
  public teamStanding: any;
  public tournamentData;
  public dateFilter: any;
  public useDateFilter: boolean = false;
  public isFollowing: boolean = false;

  constructor(
    protected nav: NavController,
    protected navParams: NavParams,
    protected eliteApi: EliteApiService,
    protected alertCtrl: AlertController,
    protected toastCtrl: ToastController,
  ) {
    this.init();
  }

  init(): void {
    this.team = this.navParams.data.team;
    this.tournamentData = this.eliteApi.getTournamentData();

    this.games = this.tournamentData.games.filter((game: any) => {
      return game.team1Id === this.team.id || game.team2Id === this.team.id;
    }).map((game: any) => {
      const isTeam1 = (game.team1Id === this.team.id);
      const opponentName = isTeam1 ? game.team2 : game.team1;
      const scoreDisplay = this.getScoreDisplay(isTeam1, game.team1Score, game.team2Score);
      return {
        gameId: game.id,
        opponent: opponentName,
        time: Date.parse(game.time),
        location: game.location,
        locationUrl: game.locationUrl,
        scoreDisplay: scoreDisplay,
        homeAway: (isTeam1 ? 'vs' : 'at'),
        won: isTeam1 ? game.team1Score > game.team2Score : game.team2Score > game.team1Score,
      };
    });
    this.allGames = this.games.slice(0);
    this.teamStanding = this.tournamentData.standings.find((s: any) => s.teamId === this.team.id);
  }

  getScoreDisplay(isTeam1: boolean, team1Score: number, team2Score: number): string {
    if (team1Score && team2Score) {
      const teamScore = (isTeam1 ? team1Score: team2Score);
      const opponentScore = (isTeam1 ? team2Score : team1Score);
      const winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';
      return winIndicator + teamScore + '-' + opponentScore;
    } else {
      return '';
    }
  }

  onGameClicked(game): void {
    const sourceGame = this.tournamentData.games.find((g: any) => g.id === game.gameId);
    this.nav.parent.parent.push(GamePage, { game: sourceGame });
  }

  onDateChanged(): void {
    if (this.useDateFilter){
      this.games = this.allGames.filter((g: any) => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.dateFilter = null;
      this.games = this.allGames.slice(0);
    }
  }

  getScoreWorL(game: any): string {
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  toggleFollow(): void {
    const futureVal = !this.isFollowing;
    if (!futureVal) {
      const confirm = this.alertCtrl.create({
        title: 'Unfollow ' + this.team.name,
        message: 'Are you sure you want to preform this action?',
        buttons: [
          { text: 'Yes', handler: () => {
              this.isFollowing = false;
              const toast = this.toastCtrl.create({
                message: 'Unfollowed ' + this.team.name,
                dismissOnPageChange: true,
                showCloseButton: true,
                position: 'bottom',
                duration: 2000,
              });
              toast.present();
              return true;
            }
          },
          { text: 'Cancel' },
        ]
      });

      confirm.present();
    } else {
      this.isFollowing = true;
    }
  }
}
