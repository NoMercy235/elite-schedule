import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Events } from "ionic-angular";
import { Globals } from "./globals";

@Injectable()
export class UserSettingsService {

  constructor(
    protected storage: Storage,
    protected events: Events,
  ) {}

  favTeam(team: any, tournamentId: string, tournamentName: string): void {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName,
    };

    this.storage.set('team-' + team.id, JSON.stringify(item)).then(() => {
      this.events.publish(Globals.EVENTS.userSettings.favChanged, team);
    });
  }

  unfavTeam(team): void {
    this.storage.remove('team-' + team.id).then(() => {
      this.events.publish(Globals.EVENTS.userSettings.favChanged, team);
    });
  };

  isFavTeam(teamId): Promise<boolean> {
    return this.storage.get('team-' + teamId).then(value => !!value);
  }

  getAllFavs(): Promise<any[]> {
    let items = [];
    return this.storage.forEach((val: any, key: string, index: number) => {
      items.push(JSON.parse(val));
    }).then(() => {
      return items.length ? items : null
    });
  }
}
