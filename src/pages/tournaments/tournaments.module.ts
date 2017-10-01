import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TournamentsPage } from './tournaments';
import { SharedModule } from "../../app/shared/shared.module";

@NgModule({
  declarations: [
    TournamentsPage,
  ],
  imports: [
    IonicPageModule.forChild(TournamentsPage),
    SharedModule,
  ],
})
export class TournamentsPageModule {}
