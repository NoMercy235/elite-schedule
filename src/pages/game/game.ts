import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Globals } from "../../app/shared/globals";

@IonicPage({ name: Globals.PAGE_NAMES.game })
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

}
