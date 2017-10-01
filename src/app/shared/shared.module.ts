import { NgModule } from '@angular/core';
import { EliteApiService } from "./elite-api.service";
import { HttpModule } from "@angular/http";

@NgModule({
  imports: [
    HttpModule,
  ],
  exports: [
    HttpModule,
  ],
  declarations: [],
  providers: [
    EliteApiService,
  ],
})
export class SharedModule {
}
