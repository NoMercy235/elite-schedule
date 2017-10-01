import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable()
export class UserSettingsService {

  constructor(
    protected storage: Storage,
  ) {}

  favTeam(team: any, tournamentId: string, tournamentName: string): void {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName,
    };

    this.storage.set('team-' + team.id, JSON.stringify(item));
  }

  unfavTeam(team): void {
    this.storage.remove('team-' + team.id);
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
