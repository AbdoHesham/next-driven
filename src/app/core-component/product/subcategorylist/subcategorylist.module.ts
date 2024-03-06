import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategorylistRoutingModule } from './subcategorylist-routing.module';
import { SubcategorylistComponent } from './subcategorylist.component';


import { sharedModule } from 'src/app/shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [SubcategorylistComponent],
  imports: [CommonModule, SubcategorylistRoutingModule, sharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      isolate: false
    }),
  ],
})
export class SubcategorylistModule {}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}