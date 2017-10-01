import { NgModule } from '@angular/core';
import { EliteApiService } from "./elite-api.service";
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";
import { UserSettingsService } from "./user-settings.service";

@NgModule({
  imports: [
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  exports: [
    HttpModule,
  ],
  declarations: [],
  providers: [
    EliteApiService,
    UserSettingsService,
  ],
})
export class SharedModule {
}
