import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import 'rxjs';

@Injectable()
export class EliteApiService {
  private baseUrl: string = 'https://elite-schedule-app-64355.firebaseio.com/';
  private currentTournament: any = {};
  private tournamentData: any = {};

  constructor(
    protected http: Http
  ) { }

  getTournaments(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`)
        .subscribe(res => resolve(res.json()))
    });
  }

  getTournament(tourneyId, forceRefresh: boolean = false) : Observable<any> {
    if (!forceRefresh && this.tournamentData[tourneyId]) {
      this.currentTournament = this.tournamentData[tourneyId];
      return Observable.of(this.tournamentData);
    }

    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
      .map(response => {
        this.tournamentData[tourneyId] = response.json();
        this.currentTournament = this.tournamentData[tourneyId];
        return this.currentTournament;
      });
  }

  getTournamentData(): any {
    return this.currentTournament;
  }

  refreshCurrentTournament(): Observable<any> {
    return this.getTournament(this.currentTournament.tournament.id, true);
  }
}
