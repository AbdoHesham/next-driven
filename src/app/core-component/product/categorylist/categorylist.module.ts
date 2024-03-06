import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategorylistRoutingModule } from './categorylist-routing.module';
import { CategorylistComponent } from './categorylist.component';

import { sharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CategorylistComponent],
  imports: [CommonModule, CategorylistRoutingModule, sharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),],
})
export class CategorylistModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
