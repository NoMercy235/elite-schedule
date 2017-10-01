import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";

@IonicPage({ name: Globals.PAGE_NAMES.game })
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  constructor() {}

}
