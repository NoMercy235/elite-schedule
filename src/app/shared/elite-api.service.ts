import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

import 'rxjs';

@Injectable()
export class EliteApiService {
  private baseUrl: string = 'https://elite-schedule-app-64355.firebaseio.com/';
  public currentTournament: any = {};

  constructor(
    protected http: Http
  ) { }

  getTournaments(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`)
        .subscribe(res => resolve(res.json()))
    });
  }

  getTournament(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${id}.json`)
      .map((res: Response) => {
        this.currentTournament = res.json();
        return this.currentTournament;
      });
  }
}
