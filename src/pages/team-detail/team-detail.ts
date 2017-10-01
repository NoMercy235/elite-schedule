import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";
import { Team } from "../../app/shared/interfaces";
import { EliteApiService } from "../../app/shared/elite-api.service";
import { GamePage } from "../game/game";

@IonicPage({ name: Globals.PAGE_NAMES.teamDetails })
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  public team: Team;
  public games: any[];
  public tournamentData;

  constructor(
    protected nav: NavController,
    protected navParams: NavParams,
    protected eliteApi: EliteApiService,
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
      };
    });
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
    const sourceGame = this.tournamentData.games.find((g: any) => g.id === game.gameId)
    this.nav.parent.parent.push(GamePage, { game: sourceGame });
  }
}
