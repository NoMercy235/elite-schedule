import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { EliteApiService } from "../../app/shared/elite-api.service";

@IonicPage()
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  public allStandings: any[];
  public standings: any[];
  public team: any;

  public standingCols = [
    { label: 'Wins', name: 'wins' },
    { label: 'Losses', name: 'losses' },
    { label: 'Pct', name: 'winningPct' },
    { label: 'PF', name: 'pointsFor' },
    { label: 'PA', name: 'pointsAgainst' },
    { label: 'Diff', name: 'pointsDiff' },
  ];

  constructor(
    protected navParams: NavParams,
    protected eliteApi: EliteApiService,
  ) {
    this.team = this.navParams.data.team;
    const tournament = this.eliteApi.getTournamentData();
    this.standings = tournament.standings;
    this.allStandings = tournament.standings;
    this.filterDivision();
  }

  getHeader(record, recordIndex, records): string {
    return (recordIndex === 0 || record.division !== records[recordIndex - 1].division) ? record.division : null;
  }

  filterDivision(event?: any){
    if(event && event.value === 'all'){
      this.standings = this.allStandings.slice(0);
    } else {
      const division = this.allStandings.find((s: any) => s.teamId === this.team.id).division;
      this.standings = this.allStandings.filter(s => s.division === division);
    }
  }
}
